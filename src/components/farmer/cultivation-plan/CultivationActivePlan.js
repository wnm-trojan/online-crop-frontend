import '../../../assets/css/dashboard/Dashboard.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import CultivationPlanService from '../../../services/CultivationPlanService';
import { useTable } from "react-table";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';

const CultivationActivePlan = (props) => {
    var current_date = new Date().toJSON().slice(0, 10);
    const { auth } = props;
    const [cultivation, setCultivation] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const cultivationRef = useRef(null);
    const navigate = useNavigate();
  
    // cultivationRef.current = cultivation;
  
    useEffect(() => {
      retrieveCultivation();
    }, []);
  
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveCultivation = () => {
      CultivationPlanService.getFarmerActiveComplete('active', auth.user.user.user_id, current_date)
        .then((response) => {
          setCultivation(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveCultivation();
    };
  
    const removeAllCultivation = () => {
      CultivationPlanService.removeAll()
        .then((response) => {
          console.log(response.data);
          refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const findByTitle = () => {
      CultivationPlanService.findByTitle(searchTitle)
        .then((response) => {
          setCultivation(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const editPlan = (plan_id) => {
      const id = plan_id;
  
      navigate("/dashboard/farmer/cultivation-plan/edit/" + id);
    };
  
    const deletePlan = (plan_id) => {
      const id = plan_id;
  
      CultivationPlanService.remove(id)
        .then((response) => {
          NotificationManager.success(response.data);
          refreshList();
  
          // let newCultivation = [...cultivationRef.current];
          // newCultivation.splice(plan_id, 1);
          // setCultivation(newCultivation);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const columns = useMemo(
    () => [
        {
        Header: "Crop Item",
        accessor: "crop_master.crop_name",
        },
        {
        Header: "District",
        accessor: "farm_district.name",
        },
        {
        Header: "Start Date",
        accessor: "planned_start_date",
        },
        {
        Header: "Harvest Date",
        accessor: "planned_harvest_date",
        },
        {
        Header: "Expected Harvest (Kg)",
        accessor: "expected_harvest_kg",
        },
        {
        Header: "Actions",
        accessor: "plan_id",
        Cell: (props) => {
            const plan_id = props.row.original.plan_id;
            // console.log(props.row.original.plan_id);
            return (
            <div>
                <span className="mx-1" onClick={() => editPlan(plan_id)}>
                <FaIcons.FaEdit />
                </span>

                <span onClick={() => deletePlan(plan_id)}>
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
        data: cultivation,
    });
  
    return (
        <div className="content-load">
          <div className="page-box">
            <div className='page-header'>
              <div className='row'>
                <div className="col-md-6">
                  <h6 className='title'>Active Cultivation Plan</h6>
                </div>
                <div className="col-md-6 text-end">
                  <a className='btn btn-info btn-small' href='/dashboard/farmer/cultivation-plan/create'><FaIcons.FaPlus/> Create Plan</a>
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

  export default connect(mapStateToProps)(CultivationActivePlan);