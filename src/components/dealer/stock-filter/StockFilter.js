import '../../../assets/css/dashboard/Dashboard.css';
import '../../../assets/css/dealer/Dealer.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import DistrictService from '../../../services/DistrictService';
import SalesStockService from '../../../services/SalesStockService';
import { useTable } from "react-table";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';
import FarmerInformationModal from '../components/FarmerInformationModal';

const StockFilter = (props) => {
    const { auth } = props;
    const [stocks, setStocks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [farmer, setFarmer] = useState([]);
  
    useEffect(() => {
      retrieveCultivation();
      retrieveFilters();
    }, []);
  
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveCultivation = () => {
      SalesStockService.getAll()
        .then((response) => {
          setStocks(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const retrieveFilters = () => {
        DistrictService.getAll()
        .then((response) => {
          setDistricts(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveCultivation();
    };

    const handleDistrict = event => {
        const district_id = event.target.value;
        stockFilterByDistrict(district_id);
    }

    const stockFilterByDistrict = (district_id) => {
        SalesStockService.getByDistrict(district_id)
        .then((response) => {
          setStocks(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const handleModalOpen = (farmer) => {
        setModalShow(true);
        setFarmer(farmer);
    }

    const changeShow = (action) => {
        setModalShow(action);
    }

    const columns = useMemo(
    () => [
        {
        Header: "Crop Item",
        accessor: "crop_master.crop_name",
        Cell: (props) => {
            const name = props.row.original.crop_master.crop_name;
            const image = props.row.original.crop_master.image_name
            return (
            <div>
              <h6>{name}</h6>
              <img src={"/images/analyzer/"+image} alt={image} className="img-fluid" width={55} />
            </div>
            );
        },
        },
        {
        Header: "Cultivation District",
        accessor: "cultivation_plan.farm_district.name",
        },
        {
        Header: "Stock (Kg)",
        accessor: "available_qty",
        },
        {
        Header: "Stock added Date",
        accessor: "record_timestamp",
        },
        {
        Header: "Actions",
        accessor: "farmer_id",
        Cell: (props) => {
            console.log(props);
            const farmer = props.row.original.applicationUser_profile;
            return (
            <div>
                <span className="badge bg-info mx-1" variant="primary" onClick={() => handleModalOpen(farmer)}>Contact to farmer</span>
            </div>
            );
        },
        },
    ],
    []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: stocks,
    });
  
    return (
        <div className="content-load">
          <div className="page-box">
            <div className='page-header'>
              <div className='row'>
                <div className="col-md-6">
                  <h6 className='title'>Cultivation Stock</h6>
                </div>
                <div className="col-md-6 text-end">
                    <div className='row'>
                        <div className="col col-md-12">
                            <div className="form-outline mb-4">
                                <select 
                                    className="form-select" 
                                    name="farm_district_id" 
                                    id="farm_district_id" 
                                    onChange={handleDistrict} 
                                    defaultValue="all">
                                    <option value="all">All district</option>
                                    {districts.map((district, index) => ( 
                                        <option key={index} value={district.id}>{district.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className='page-body'>
              <div className='container'>
                <div className='row'>
                  <div className="col-md-12 list">
                      <table
                      className="table table-striped table-bordered"
                      {...getTableProps()}
                      >
                      <thead>
                          {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                              <th>No</th>
                              {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                  {column.render("Header")}
                              </th>
                              ))}
                          </tr>
                          ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                          {rows.map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                                <td>{i+1}</td>
                            {row.cells.map((cell) => {
                                return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                            </tr>
                          );
                          })}
                      </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
            <FarmerInformationModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              auth={auth}
              farmer={farmer}
            />
          </div>
        </div>
    );
  };
  
  const mapStateToProps = (state) => {
    return {
        auth: state,
    }
  }

  export default connect(mapStateToProps)(StockFilter);