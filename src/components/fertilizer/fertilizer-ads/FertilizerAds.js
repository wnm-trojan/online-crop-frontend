import '../../../assets/css/dashboard/Dashboard.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';
import FertilizerAdsService from '../../../services/FertilizerAdsService';
import { useTable } from "react-table";

const FertilizerAds = (props) => {
    const { auth } = props;
    const [fertilizerAds, setFertilizerAds] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      retrieveFertilizerAds();
    }, []);
  
    const retrieveFertilizerAds = () => {
        FertilizerAdsService.getAll()
        .then((response) => {
            setFertilizerAds(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
        retrieveFertilizerAds();
    };
  
    // const findByTitle = () => {
    //   CultivationPlanService.findByTitle(searchTitle)
    //     .then((response) => {
    //       setCultivation(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // };
  
    const editFertilizerAds = (fertilizer_id) => {
      const id = fertilizer_id;
  
      navigate("/dashboard/farmer/cultivation-plan/edit/" + id);
    };
  
    const deleteFertilizerAds = (fertilizer_id) => {
      const id = fertilizer_id;
  
      FertilizerAdsService.remove(id)
        .then((response) => {
          NotificationManager.success(response.data);
          refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const columns = useMemo(
      () => [
      {
        Header: "Item Name",
        accessor: "fertilizer_name",
      },
      {
        Header: "Description",
        accessor: "details",
      },
      {
        Header: "Create Date",
        accessor: "created_date",
      },
      {
      Header: "Actions",
      accessor: "fertilizer_id",
      Cell: (props) => {
          const fertilizer_id = '';
          return (
          <div>
              <span className="mx-1" onClick={() => editFertilizerAds(fertilizer_id)}>
              <FaIcons.FaEdit />
              </span>

              <span onClick={() => deleteFertilizerAds(fertilizer_id)}>
              <RiIcons.RiDeleteBin6Line />
              </span>
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
      data: fertilizerAds,
  });
  
    return (
        <div className="content-load">
          <div className="page-box">
            <div className='page-header'>
              <div className='row'>
                <div className="col-md-6">
                  <h6 className='title'>Fertilizer Ad List</h6>
                </div>
                <div className="col-md-6 text-end">
                  <a className='btn btn-info btn-small' href='/dashboard/fertilizer/fertilizer-ads/create'><FaIcons.FaPlus/> Create Fertilizer Ad</a>
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

  export default connect(mapStateToProps)(FertilizerAds);