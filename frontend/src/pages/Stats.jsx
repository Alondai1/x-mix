import React from 'react'
import { Link } from 'react-router-dom'
import {
    PieChart, Pie
} from 'recharts';
import { connect } from 'react-redux';



const data = [
    { name: 'Wins', value: 8 },  { name: 'Loses', value: 2 },
];


const Stats = ({loggedInUser}) => {

    



    return (
        <div>
            <Link to="/">
                <h1>back</h1>
            </Link>


            <PieChart width={400} height={330}>
                <Pie dataKey="value" startAngle={180} endAngle={0} data={data} cx={200} cy={200} outerRadius={80} fill="#00000066" label />
            </PieChart>


        </div>
    )
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.user.loggedInUser
    };
  };
  const mapDispatchToProps = {
    

  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Stats);
