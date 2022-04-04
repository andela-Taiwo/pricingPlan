import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import { mockData } from "../mock";
import { TableDescriptors, Plan} from '../types'
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
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


const tranformPlanData = (data: Plan): any[] => {
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

const  PricingTable = () => {
  const renderValue = (value: string|number|boolean) => {
    return value ? typeof value === 'boolean' ? <>&#88;</> : value : <>&#45;</>
  }
  mockData.sort((a:Plan, b:Plan) => a?.name.localeCompare(
      b?.name,
      undefined,
      { numeric: true, sensitivity: 'base' }
  ));
  const result =  mockData.map((item: Plan) => tranformPlanData(item))
  const shape = result[0]
  const tableHeaders = mockData.map(item => item?.name)
  const row = []
  for (let a = 0; a < shape?.length; a++) {
    if (typeof shape?.[a] === 'string') {
      let temp = []
      for (let i=0; i<mockData.length; i++ ) {
        temp.push(<StyledTableCell className="side-header-sections"/>)
      }
      row.push(
        <TableRow style={{backgroundColor: '#eee' }}>
          <StyledTableCell  component="th" scope="row" 
          className="side-header-sections"
          >
            {shape[a]}
          </StyledTableCell>
          {temp}
      </TableRow>
      )
    }
    if (Array.isArray(shape[a])) {
      let temp = [] 
      for (let i=0; i<mockData.length; i++ ) {
        temp.push(<StyledTableCell align="center" key={i}>{renderValue(result[i][a][1])}</StyledTableCell>)
      }
      row.push(
        <TableRow>
          <StyledTableCell component="th" scope="row" 
          style={{backgroundColor: '#eee'}}>
            {shape[a][0] === 'Price'? `${shape[a][0]} (€)` : shape[a][0] }
          </StyledTableCell>
          {temp}
        </TableRow>
      )

    }
  }
  return (
  <Stack spacing={1}>
   <Item><h3 className="title">Pricing Plans</h3></Item>
    <Item>

    <TableContainer className="plans-table" >
      <Table aria-label="Plans table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>Tiers</StyledTableCell>
            {tableHeaders.map(name => (<StyledTableCell align="center" key={name} >{name}</StyledTableCell>) )}
          </TableRow>
        </TableHead>
        <TableBody>
        {row}
        </TableBody>
      </Table>
    </TableContainer>
    </Item>
    
  </Stack>
  );
}

export default PricingTable