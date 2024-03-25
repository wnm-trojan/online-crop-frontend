import '../../../assets/css/dashboard/Dashboard.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import SalesStockService from '../../../services/SalesStockService';
import { useTable } from "react-table";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';

const StockList = (props) => {
    const { auth } = props;
    const [stocks, setStocks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      retrieveCultivation();
    }, []);
  
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveCultivation = () => {
      SalesStockService.getByFarmer(auth.user.user.user_id)
        .then((response) => {
          setStocks(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveCultivation();
    };

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
                  <h6 className='title'>Farmer Stock</h6>
                </div>
                <div className="col-md-6 text-end">
                  <a className='btn btn-info btn-small' href='/dashboard/farmer/cultivation-completed-plan'><FaIcons.FaPlus/> Add to stock</a>
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
          </div>
        </div>
    );
  };
  
  const mapStateToProps = (state) => {
    return {
        auth: state,
    }
  }

  export default connect(mapStateToProps)(StockList);