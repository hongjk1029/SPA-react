import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import vehicleData from "../../../assets/data/vehicleData";
import "../../../styles/common-section.css";
import { getVehicles, deleteVehicle, downloadVehicleDocument, BASE_URL, VEHICLE_DOC_URL } from "../../../services/api/Provider";

function ViewVehicles() {
  const { SearchBar } = Search;
  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();
  const updateVehicle = (id, accessories, images, documents) =>{
    navigate("/admin/vehicles/edit",{
      state: {
        Id: id,
        Accessories: accessories,
        VehicleImages: images,
        VehicleDocuments: documents
      }
    });
  }

  async function _deleteVehicle(id) {
    await deleteVehicle(id)
    window.location.reload(false);
  }
  
  async function _downloadVehicleDocument(id) {
    await downloadVehicleDocument(id)
    .then(() => {
      const link = document.createElement('a');
      const filename = "vehicle 2wq-brand 1.zip";
      link.href = `${BASE_URL}/${VEHICLE_DOC_URL}${id}/download/`
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })

    // 2nd method to download zip file but facing an issue (file type or format is unsupported) when opening zip file

      //   => response.blob())
      //   .then((blob) => {
      //     const url = window.URL.createObjectURL(new Blob([blob], {type: 'application/zip'}));
      //     const link = document.createElement('a');
      //     link.href = url
      //     link.setAttribute("download", "receipt.zip");
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //     // window.URL.revokeObjectURL(url);
      //     })
      // }
  }
    

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true,
      headerClasses: 'pointer'
    },
    {
      dataField: 'vehicle',
      text: 'Vehicle Title',
      sort: true,
      headerClasses: 'pointer'
    },
    {
      dataField: 'vehicle_brand.brand_name',
      text: 'Brand',
      sort: true,
      headerClasses: 'pointer'
    },
    {
      dataField: 'price_of_cost',
      text: 'Sale Type',
      sort: true,
      headerClasses: 'pointer',
      formatter: (cellContent, row) => {
        if (row.price_of_cost != null) {
          return (
            "Sale"
          );
        }
        return (
          "Rental"
        );
      }
    },
    {
      dataField: 'rentalPrice',
      text: 'Rental Price(RM)',
      sort: true,
      headerClasses: 'pointer',
      formatter: (cellContent, row) => {
        if (row.rentalPrice != null) {
          return (
            row.rentalPrice
          );
        }
        return (
          "-"
        );
      }
    },
    {
      dataField: 'price_of_sale',
      text: 'Sale Price(RM)',
      sort: true,
      headerClasses: 'pointer',
      formatter: (cellContent, row) => {
        if (row.price_of_sale != null) {
          return (
            row.price_of_sale
          );
        }
        return (
          "-"
        );
      }
    },
    {
      dataField: 'fuel_type',
      text: 'Fuel Type',
      sort: true,
      headerClasses: 'pointer'
    },
    {
      dataField: 'model_year',
      text: 'Model Year',
      sort: true,
      headerClasses: 'pointer'
    },
    {
      dataField: 'vehicle_brand.removed',
      text: 'Status',
      sort: true,
      headerClasses: 'pointer',
      formatter: (cellContent, row) => {
        if (row.vehicle_brand.removed == null) {
          return (
            <span className="badge bg-success">Active</span>
          );
        }
        return (
          <span className="badge bg-danger">Inactive</span>
        );
      }
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (cellContent, row) => {
        return (
          <div>
            <FiEdit className="text-primary btnEdit" role="button" onClick={() => updateVehicle(row.id, row.accessories, row.vehicle_images, row.vehicle_documents)}/>
            <FiDownload className="text-primary btnEdit" role="button" onClick={() => _downloadVehicleDocument(row.id)} />
            <IoMdClose className="text-danger" role="button"  onClick={() => _deleteVehicle(row.id)}/>
          </div>
        );
      }
    }
  ];

  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];


  useEffect(() => {
    window.scrollTo(0, 0);
    _getVehicles();
  }, []);

  function _getVehicles() {
    getVehicles().then((res) => {
      let arr = res;
      setVehicles(arr);
    });
  }

  return (
    <section>
      <Container>
        <Row>
          <h2>Manage Vehicles</h2>
          <hr className="style1 text-secondary"></hr>
          <ToolkitProvider keyField="id" data={vehicles} columns={columns} search >
            {(props) => (
              <div>
                <SearchBar srText='' {...props.searchProps} />
                {"   "}
                {"   "}
                <button onClick={props.searchProps.onClear} className="btn btn-secondary btn-sm" style={{ position: "relative", top: "-2px" }} > Clear </button>
                <br />
                <br />
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory()}
                  striped
                  hover
                  condensed
                  noDataIndication={"no results found"}
                  headerClasses="noselect"
                />
              </div>
            )}
          </ToolkitProvider>
          {/* <BootstrapTable bootstrap4 keyField='id' data={ vehicleData } columns={ columns } defaultSorted={ defaultSorted } pagination={ paginationFactory() } striped hover condensed noDataIndication={ 'no results found' } headerClasses="noselect" /> */}
        </Row>
      </Container>
    </section>
  )
}


export default ViewVehicles;
