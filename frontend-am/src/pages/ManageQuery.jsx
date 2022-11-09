import React from "react";
import { Container, Row, Col } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import contactData from "../assets/data/contactData";
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
    text: 'Name',
    sort: true,
    headerClasses: 'pointer'
  }, 
  {
    dataField: 'email',
    text: 'Email',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'contactNo',
    text: 'Contact No',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'message',
    text: 'Message',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'postingDate',
    text: 'Posting Date',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'action',
    text: 'Action',
    sort: true,
    headerClasses: 'pointer'
  }
];

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}];

const ManageQuery = () => {
  return(
    <section>
      <Container>
        <Row>
          <h2>Manage Brands</h2>
          <hr class="style1 text-secondary"></hr>
          <BootstrapTable 
            bootstrap4
            keyField='id' 
            data={ contactData } 
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

export default ManageQuery;
