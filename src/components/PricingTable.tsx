import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockData } from "../mock";
import { TableDescriptors, Plan } from '../types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const readableHeaders: TableDescriptors = {
  description: {
      display: 'Description',
    },
    price: {
      display: 'Price',
      prefix: '€',
    },
    detailedReporting: {
      display: 'Detailed Reports',
    },
    weeklyDataReports: {
      display: 'Weekly Data Reports',
    },
    createReport: {
      display: 'Create your own reports',
    },
    createBlog: {
      display: 'Create your own blog',
    },
    uploadImages: {
      display: 'Upload Images',
    },
    uploadFiles: {
      display: 'Upload files',
    },
    shareFiles: {
      display: 'Share files with team',
    },
    watchVideos: {
      display: 'Watch Videos',
    },
    installNewApps: {
      display: 'Install new apps',
    },
    installCustomApps: {
      display: 'Install custom apps',
    },
    applicationIntegrations: {
      display: 'Application Intergrations',
    },
    diagnosisCode: {
      display: 'File Storage',
    },
    blog: {
      display: 'Blog',
    },
    reporting: {
      display: 'Reporting',
    },
    fileActions: {
      display: 'File Storage'
    }
  }


const tranformPlanData = (data: Plan) => {
  const sections: string[] = Object.keys(data)
  const columnHeaders = []
  for (const item of sections) {
    const keyObject  = data[item as keyof Plan]
    if (keyObject  !== null && keyObject.constructor.name === "Object"){
      if(readableHeaders[item]?.display) {
        columnHeaders.push(readableHeaders[item]?.display)
      }
      
      for(const [k, v] of Object.entries(keyObject)) {
        columnHeaders.push([readableHeaders[k]?.display, v])
      }
      columnHeaders.push(null)
    }
  }
  return columnHeaders
}

const  PricingTable = (props: any) => {
  const renderValue = (value: string|number|boolean) => {
    return value ? typeof value === 'boolean' ? <>&#88;</> : value : <>&#45;</>
  }
  mockData.sort((a:Plan, b:Plan) => a?.name.localeCompare(
      b?.name,
      undefined,
      { numeric: true, sensitivity: 'base' }
  ));
  const result:any = mockData.map(item => tranformPlanData(item)) 
  const shape = result[0]
  const tableHeaders = mockData.map(item => item?.name)
  const output = []
  for (let a = 0; a < shape.length; a++) {
    if (typeof shape[a] === 'string') {
      let temp = []
     for (let i=0; i<mockData.length; i++ ) {
        temp.push(<StyledTableCell style={{backgroundColor: '#eee', border: 0}}/>)
      }
      output.push(
        <TableRow style={{backgroundColor: '#eee' }}>
          <StyledTableCell  component="th" scope="row" style={{backgroundColor: '#eee', border: 0, fontSize: '16px', fontWeight: 'bold'}}>{shape[a]}</StyledTableCell>
          {temp}
      </TableRow>
      )
    }
    if (Array.isArray(shape[a])) {
      let temp = []
      for (let i=0; i<mockData.length; i++ ) {
        temp.push(<StyledTableCell align="center">{renderValue(result[i][a][1])}</StyledTableCell>)
      }
      output.push(
        <TableRow>
          <StyledTableCell component="th" scope="row" style={{backgroundColor: '#eee'}}>{shape[a][0] === 'Price'? `${shape[a][0]} (€)` : shape[a][0] }</StyledTableCell>
          {temp}
        </TableRow>
      )

    }
  }
  return (
  <div className="pricingTable">
    <h3 className="title">Pricing Plans</h3>
    <TableContainer >
      <Table aria-label="Plans table" >
        <TableHead>
          <TableRow style={{backgroundColor: '#eee'}}>
            <StyledTableCell>Tiers</StyledTableCell>
            {tableHeaders.map(name => (<StyledTableCell align="center" >{name}</StyledTableCell>) )}
          </TableRow>
        </TableHead>
        <TableBody>
        {output}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}

export default PricingTable