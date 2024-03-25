import '../../../assets/css/dashboard/Dashboard.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import CultivationPlanService from '../../../services/CultivationPlanService';
import { useTable } from "react-table";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';
import AddToStockForm from './AddToStockForm';

const CultivationCompletedPlan = (props) => {
    var current_date = new Date().toJSON().slice(0, 10);
    const { auth } = props;
    const [cultivation, setCultivation] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const cultivationRef = useRef(null);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [selectPlan, setSelectPlan] = useState([]);
  
    // cultivationRef.current = cultivation;
  
    useEffect(() => {
      retrieveCultivation();
    }, []);
  
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveCultivation = () => {
      CultivationPlanService.getFarmerActiveComplete('complete', auth.user.user.user_id, current_date)
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

    const planGetById = (plan_id) => {
        CultivationPlanService.get(plan_id)
        .then((response) => {
          setSelectPlan(response.data);
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

    const handleModalOpen = (plan_id) => {
      setModalShow(true);
      planGetById(plan_id)
    }

    const changeShow = (action) => {
      setModalShow(action);
    }

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
            const stock_status = props.row.original.stock_status;
            return (
            <div>
                {stock_status ? (
                  <span className="badge bg-success mx-1" variant="primary">Added to stock</span>
                ) : (
                  <span className="badge bg-info mx-1" variant="primary" onClick={() => handleModalOpen(plan_id)}>Add to stock</span>
                )}

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
                  <h6 className='title'>Completed Cultivation Plan</h6>
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
                            <tr {...row.getRowProps()} key={i}>
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
            <AddToStockForm
              show={modalShow}
              onHide={() => setModalShow(false)}
              plan={selectPlan}
              auth={auth}
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

  export default connect(mapStateToProps)(CultivationCompletedPlan);