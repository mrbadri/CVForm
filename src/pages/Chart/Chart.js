import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';






const Chart = () => {

    // for count skills
    let skillsCountOBJ = {
        html: 0 , 
        css:0 , 
        javascript: 0 , 
        python: 0 
    }

    // we use state to show live changes
    const [skillsCount , setskillsCount] = useState(skillsCountOBJ)

    
    useEffect(() => {
        exportData()
    }, [])
    
    // export data 
    const exportData = () => {
        JSON.parse(localStorage.getItem("userList"))
        .map(item=>(item.skills
            .map(skill => {
                if(skill === "html")
                skillsCountOBJ.html++ ; 
                if(skill === "css")
                skillsCountOBJ.css++ ; 
                if(skill === "javascript")
                skillsCountOBJ.javascript++ ; 
                if(skill === "python")
                skillsCountOBJ.python++ ; 
            }
            )));
        }
        
   

    exportData() ; 

    // chart data
    const data = {
        labels: ['Html', 'Css', 'JavaScript', 'Python'],
        datasets: [
        {
            label: '# of Votes',
            data: [skillsCount.html, skillsCount.css, skillsCount.javascript, skillsCount.python],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-5/12 ">
                <Doughnut data={data} />
            </div>
        </div> 
    );
}
 
export default Chart;