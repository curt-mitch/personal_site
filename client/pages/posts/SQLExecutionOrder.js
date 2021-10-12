import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Topbar from "../components/Topbar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  title: {
    padding: theme.spacing(2),
    maxWidth: '700px',
    margin: 'auto',
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  },
  codeHighlight: {
    padding: '0px 48px',
    maxWidth: '700px',
    margin: 'auto',
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
    maxWidth: '700px',
    margin: 'auto',
  },
  sqlTableRow: {
    display: 'block',
  },
  codeSample: {
    backgroundColor: '#EDEDED',
    fontFamily: 'Courier, monospace',
  },
});

class SQLExecutionOrder extends Component {

  render() {
    const { classes } = this.props;

    const sqlContent1 =
`  SELECT
    customer_id,
    contract_1,
    contract_2,
    contract_3,
    SUM(contract_1, contract_2, contract_3) AS contract_totals
  FROM contract_table;`;
    const sqlContent2 =
`  SELECT
    customer_id,
    contract_1,
    contract_2,
    contract_3,
    SUM(contract_1, contract_2, contract_3) AS contract_totals
  FROM contract_table
  ORDER BY contract_totals;`;
    const sqlContent3 =
`  SELECT
    customer_id,
    contract_1,
    contract_2,
    contract_3,
    SUM(contract_1, contract_2, contract_3) AS contract_totals
  FROM contract_table
  ORDER BY sum(contract_1, contract_2, contract_3);`;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            SQL's Order of Execution
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            If you started learning SQL after having learned a language like Java or Python, it takes getting used to different concepts inherent in database querying, let alone the varied differences in the way SQL runs. Once you’ve started writing anything more complicated than the “Hello, World!” of SQL queries, meaning <span className={classes.codeSample}>SELECT * FROM TABLE;</span>, then you’ve probably encountered errors that hint at one of the more unintuitive aspects of the language: the order of execution in a SQL statement.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            As an example, say we’re creating a derived column and then we want to group the results by that new column. In this code example we’ll create a new column summing the value of multiple customer contracts from a hypothetical database:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'sql'}
            style={solarizedDark}
            wrapLines={true}
          >
            {sqlContent1}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            In the case where you want to order by the size of the contract totals, you would likely encounter an error stating that the column <span className={classes.codeSample}>contract_totals</span> does not exist:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'sql'}
            style={solarizedDark}
            wrapLines={true}
          >
            {sqlContent2}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            It turns out that standard SQL runtimes will attempt to run a “group by” statement before the “select” statement, and in fact the “select” statement is one of the last parts of a SQL query that gets executed. The following is the order that a typical SQL statement is executed in with a brief description of that command:
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>FROM</span>: pick the table(s) to be queried</span>
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>WHERE</span>: filter the rows</span>
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>GROUP BY</span>: aggregate the rows</span>
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>HAVING</span>: filter the aggregated rows</span>
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>SELECT</span>: select the columns that appear in the output</span>
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>ORDER BY</span>: sort rows by value(s)</span>
            <span className={classes.sqlTableRow}><span className={classes.codeSample}>LIMIT</span>: restrict the maximum number of returned rows</span>
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Unfortunately there’s not a great way to work around this process and your best bet is to have this order of execution memorized. For instance, returning to our previous example with the contract amount summation, it’s easiest to repeat the sum expression within the <span className={classes.codeSample}>ORDER BY</span> statement:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'sql'}
            style={solarizedDark}
            wrapLines={true}
          >
            {sqlContent3}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            Even though this should set off every programmer’s DRY alarm (DRY=“don’t repeat yourself”), writing your SQL queries with the execution order in mind will reduce the number of errors you encounter, especially as you transition from a SQL newbie to a seasoned user!
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SQLExecutionOrder));
