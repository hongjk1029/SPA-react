import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import vehicleData from "../assets/adminData/vehicleData";
import "../styles/common-section.css";

const columns = [
  {
    dataField: 'id',
    text: '#',
    sort: true,
    headerClasses: 'pointer'
  }, 
  {
    dataField: 'name',
    text: 'Vehicle Title',
    sort: true,
    headerClasses: 'pointer'
  }, 
  {
    dataField: 'brand',
    text: 'Brand',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'saleType',
    text: 'Sale Type',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'rentalPrice',
    text: 'Rental Price(RM)',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'salePrice',
    text: 'Sale Price(RM)',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'fuelType',
    text: 'Fuel Type',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'modelYear',
    text: 'Model Year',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'active',
    text: 'Status',
    sort: true,
    headerClasses: 'pointer',
    formatter: (cellContent, row) => {
      if (row.active) {
        return (
          <span class="badge bg-success">Active</span>
        );
      }
      return (
        <span class="badge bg-danger">Inactive</span>
      );
    }
  },
  {
    dataField: 'action',
    text: 'Action',
    formatter: (cellContent, row) => {
      return (
        <div>
          <FiEdit class="text-primary btnEdit" role="button"/>
          <IoMdClose class="text-danger" role="button"/>
        </div>
      );
    }
  }
];

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}];

const Vehicles = () => {
  return(
    <section>
      <Container>
        <Row>
          <h2>Manage Vehicles</h2>
          <hr class="style1 text-secondary"></hr>
          <BootstrapTable 
            bootstrap4
            keyField='id' 
            data={ vehicleData } 
            columns={ columns } 
            defaultSorted={ defaultSorted } 
            pagination={ paginationFactory() } 
            striped
            hover
            condensed
            noDataIndication={ 'no results found' }
            headerClasses="noselect"
          />
        </Row>
      </Container>
    </section>
  )
};

export default Vehicles;
