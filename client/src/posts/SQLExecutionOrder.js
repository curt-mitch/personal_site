import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import hljs from 'highlight.js/lib/core';
import Highlight from 'react-highlight.js';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/solarized-dark.css';
import Topbar from "../components/Topbar";

hljs.registerLanguage('sql', sql);

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
  codeSample: {
    backgroundColor: '#EDEDED',
    fontFamily: 'Courier, monospace',
  },
});

class SQLExecutionOrder extends Component {

  render() {
    const { classes } = this.props;

    const sqlContent1 = "SELECT";
    const sqlContent2 = "  customer_id,";
    const sqlContent3 = "  contract_1,";
    const sqlContent4 = "  contract_2,";
    const sqlContent5 = "  contract_3,";
    const sqlContent6 = "  SUM(contract_1, contract_2, contract_3) AS contract_totals";
    const sqlContent7 = "FROM contract_table";
    const sqlContent8 = "SELECT";
    const sqlContent9 = "  customer_id,";
    const sqlContent10 = "  contract_1,";
    const sqlContent11 = "  contract_2,";
    const sqlContent12 = "  contract_3,";
    const sqlContent13 = "  SUM(contract_1, contract_2, contract_3) AS contract_totals";
    const sqlContent14 = "FROM contract_table";
    const sqlContent15 = "ORDER BY contract_totals;";
    const sqlContent16 = "SELECT";
    const sqlContent17 = "  customer_id,";
    const sqlContent18 = "  contract_1,";
    const sqlContent19 = "  contract_2,";
    const sqlContent20 = "  contract_3,";
    const sqlContent21 = "  SUM(contract_1, contract_2, contract_3) AS contract_totals";
    const sqlContent22 = "FROM contract_table";
    const sqlContent23 = "ORDER BY sum(contract_1, contract_2, contract_3);";

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
          <Highlight className={classes.codeHighlight} language={'sql'}>
            {sqlContent1}
            <br/>
            {sqlContent2}
            <br/>
            {sqlContent3}
            <br/>
            {sqlContent4}
            <br/>
            {sqlContent5}
            <br/>
            {sqlContent6}
            <br/>
            {sqlContent7}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            In the case where you want to order by the size of the contract totals, you would likely encounter an error stating that the column <span className={classes.codeSample}>contract_totals</span> does not exist:
          </Typography>
          <Highlight className={classes.codeHighlight} language={'sql'}>
            {sqlContent8}
            <br/>
            {sqlContent9}
            <br/>
            {sqlContent10}
            <br/>
            {sqlContent11}
            <br/>
            {sqlContent12}
            <br/>
            {sqlContent13}
            <br/>
            {sqlContent14}
            <br/>
            {sqlContent15}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            It turns out that standard SQL runtimes will attempt to run a “group by” statement before the “select” statement, and in fact the “select” statement is one of the last parts of a SQL query that gets executed. The following is the order that a typical SQL statement is executed in with a brief description of that command:
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            <div><span className={classes.codeSample}>FROM</span>: pick the table(s) to be queried</div>
            <div><span className={classes.codeSample}>WHERE</span>: filter the rows</div>
            <div><span className={classes.codeSample}>GROUP BY</span>: aggregate the rows</div>
            <div><span className={classes.codeSample}>HAVING</span>: filter the aggregated rows</div>
            <div><span className={classes.codeSample}>SELECT</span>: select the columns that appear in the output</div>
            <div><span className={classes.codeSample}>ORDER BY</span>: sort rows by value(s)</div>
            <div><span className={classes.codeSample}>LIMIT</span>: restrict the maximum number of returned rows</div>
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Unfortunately there’s not a great way to work around this process and your best bet is to have this order of execution memorized. For instance, returning to our previous example with the contract amount summation, it’s easiest to repeat the sum expression within the <span className={classes.codeSample}>ORDER BY</span> statement:
          </Typography>
          <Highlight className={classes.codeHighlight} language={'sql'}>
            {sqlContent16}
            <br/>
            {sqlContent17}
            <br/>
            {sqlContent18}
            <br/>
            {sqlContent19}
            <br/>
            {sqlContent20}
            <br/>
            {sqlContent21}
            <br/>
            {sqlContent22}
            <br/>
            {sqlContent23}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            Even though this should set off every programmer’s DRY alarm (DRY=“don’t repeat yourself”), writing your SQL queries with the execution order in mind will reduce the number of errors you encounter, especially as you transition from a SQL newbie to a seasoned user!
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SQLExecutionOrder));
