import React, { useState, useEffect, useMemo, useRef } from "react";
import SalesStockService from '../../../services/SalesStockService';
import { useTable } from "react-table";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import FarmerInformationModal from '../components/FarmerInformationModal';

const YourAreaCultivations = (props) => {
    const { auth } = props;
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [farmer, setFarmer] = useState([]);
      
    useEffect(() => {
        retrieveCultivation();
    }, []);

    const retrieveCultivation = () => {
        SalesStockService.getByDistrict(auth.user.user.user_id)
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
        <div className="container suggesions mb-4">
            <div className='row'>
                <div className='col-md-12 d-flex align-items-center mb-3'>
                    <h6 className='com-title mb-0'>Your Area Cultivation Stocks</h6>
                </div>
                <hr></hr>
            </div>
            <div className="row">
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
                <FarmerInformationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                auth={auth}
                farmer={farmer}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

export default connect(mapStateToProps)(YourAreaCultivations);