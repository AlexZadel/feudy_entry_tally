import { useState } from 'react'
import InputScreen from './components/inputScreen'
import { DataGrid } from '@mui/x-data-grid';

import './App.css'

function App() {

  const [inputText, setInputText] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [reportData, setReportData] = useState({});
  const [initializedReport, setInitializedReportStatus] = useState(false);

  function handleTextInputChange(e) {
    setInputText(e.target.value)
  }

  function handleSubmit() {
    setHasSubmitted(true);
    console.log("Data submitted")
  }

  function handleReportUpdate(n) {
    //reassign ranking number of altered form
    var entries = Object.values(n).sort((a, b) => b.count - a.count)
    const orderedKeys = entries.map(e => e.name)
    // const entriesSorted = entries.sort((a, b) => b.count - a.count)
    // console.log("after sort", entriesSorted)
    console.log("entries", entries)
    for (const entry of Object.keys(n)) {
      n[entry]['sortOrder'] = orderedKeys.indexOf(entry) + 1
    }

    setReportData(n);
  }

  function handleInitializedReport() {
    setInitializedReportStatus(true);
    console.log("Report initialized.")
  }



  if (!hasSubmitted) { //initial state and reset state 

    return (
      <>
        <h5 id='instructions'>Enter data here and click submit to tally.</h5>
        <form>
          <label>Copy and paste data directly from results sheet. Entries should be separated by commas or line breaks.</label>
          <br></br>
          <textarea id='input-box' onChange={handleTextInputChange} value={inputText} cols={30} rows={25} />
          <br></br>
          <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
      </>
    )
  } else {
    //if report has not yet been done
    if (!initializedReport) {
      let newReport = {};
      const parsedInputText = inputText.split('\n').map(e => e.trim())
      console.log(parsedInputText);

      for (const entry of parsedInputText) {
        if (Object.keys(newReport).includes(entry)) {
          newReport[entry]["count"] += 1
        } else {
          newReport[entry] = {};
          newReport[entry]["id"] = Object.keys(newReport).length
          newReport[entry]["name"] = entry;
          newReport[entry]["count"] = 1;
          newReport[entry]["mappedValues"] = [];
          newReport[entry]["sortOrder"] = 0;
        }

        //sort data
        console.log("newReport", newReport)

        handleReportUpdate(newReport);
      }
      handleInitializedReport();
    }
  }



  const columns = [
    { field: 'sortOrder', headerName: 'Row Number', width: 125 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'mappedValues', headerName: 'Mapped Values', width: 500 },
    { field: 'count', headerName: 'Count', width: 200 }
  ];

  //render report table
  return (
    <>
      <h1>I has data</h1>
      <DataGrid
        rows={Object.values(reportData)}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'count', sort: 'desc' }]
          }
        }}
      />
    </>
  )
}




export default App
