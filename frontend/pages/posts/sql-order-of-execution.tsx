import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './posts.module.scss';
import PrismCode from '../../components/PrismCode';

const sqlContent1 =
`  SELECT
    customer_id,
    contract_1,
    contract_2,
    contract_3,
    SUM(contract_1, contract_2, contract_3) AS contract_totals
  FROM contract_table;`.trim();
    const sqlContent2 =
`  SELECT
    customer_id,
    contract_1,
    contract_2,
    contract_3,
    SUM(contract_1, contract_2, contract_3) AS contract_totals
  FROM contract_table
  ORDER BY contract_totals;`.trim();
    const sqlContent3 =
`  SELECT
    customer_id,
    contract_1,
    contract_2,
    contract_3,
    SUM(contract_1, contract_2, contract_3) AS contract_totals
  FROM contract_table
  ORDER BY sum(contract_1, contract_2, contract_3);`.trim();

function SqlOrderOfExecution() {
    return <>
        <div className={styles.root}>
            <Typography variant='h3' className={styles.title} >
                SQL's Order of Execution
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                If you started learning SQL after having learned a language like Java or Python, it takes getting used to different concepts inherent in database querying, let alone the varied differences in the way SQL runs. Once you’ve started writing anything more complicated than the “Hello, World!” of SQL queries, meaning <span className={styles.codeSample}>SELECT * FROM TABLE;</span>, then you’ve probably encountered errors that hint at one of the more unintuitive aspects of the language: the order of execution in a SQL statement.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                As an example, say we’re creating a derived column and then we want to group the results by that new column. In this code example we’ll create a new column summing the value of multiple customer contracts from a hypothetical database:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='sql'
                codeSnippet={sqlContent1}
            />
            <Typography variant='body1' className={styles.paragraph} >
                In the case where you want to order by the size of the contract totals, you would likely encounter an error stating that the column <span className={styles.codeSample}>contract_totals</span> does not exist:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='sql'
                codeSnippet={sqlContent2}
            />
            <Typography variant='body1' className={styles.paragraph} >
                It turns out that standard SQL runtimes will attempt to run a “group by” statement before the “select” statement, and in fact the “select” statement is one of the last parts of a SQL query that gets executed. The following is the order that a typical SQL statement is executed in with a brief description of that command:
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>FROM</span>: pick the table(s) to be queried</span>
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>WHERE</span>: filter the rows</span>
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>GROUP BY</span>: aggregate the rows</span>
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>HAVING</span>: filter the aggregated rows</span>
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>SELECT</span>: select the columns that appear in the output</span>
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>ORDER BY</span>: sort rows by value(s)</span>
                <span className={styles.sqlTableRow}><span className={styles.codeSample}>LIMIT</span>: restrict the maximum number of returned rows</span>
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Unfortunately there’s not a great way to work around this process and your best bet is to have this order of execution memorized. For instance, returning to our previous example with the contract amount summation, it’s easiest to repeat the sum expression within the <span className={styles.codeSample}>ORDER BY</span> statement:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='sql'
                codeSnippet={sqlContent3}
            />
            <Typography variant='body1' className={styles.paragraph} >
                Even though this should set off every programmer’s DRY alarm (DRY=“don’t repeat yourself”), writing your SQL queries with the execution order in mind will reduce the number of errors you encounter, especially as you transition from a SQL newbie to a seasoned user!
            </Typography>
        </div>
    </>;
}

export default SqlOrderOfExecution;