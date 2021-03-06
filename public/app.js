let chosenYear = 2019;
let chosenYearEB = 2019;
let dataLocal = {};
function getYear(){
  const yr = document.getElementById('year').value;
  chosenYear = yr;
  console.log('Year selected for Extra runs conceded: ' + yr);
  visualizeTeamExtras(dataLocal.teamExtras);
}

function getYearEB(){
  const yr = document.getElementById('yearEB').value;
  chosenYearEB = yr;
  console.log('Year selected for economical Bowler: ' + yr);
  visualizeBestBowlers2015(dataLocal.economicalBowlers[yr]);
}

function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();



function visualizeData(data) {
  dataLocal = data;
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeTeamWins(data.teamTotalWins);
  visualizeBestBowlers2015(data.economicalBowlers['2019']);
  visualizeWinsPerTeamPerSeason(data.winsPerTeamPerSeason);
  visualizeTeamExtras(dataLocal.teamExtras)
  visualizeSummary(data.stadiumWinsForTeams);
  visualizeMOM(data.momdata);
  return;
}


function visualizeMOM(obj){
  Highcharts.chart('mom', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Most MoM titles won over all the seasons'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a></br></br>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of MOM titles awarded'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Total MOM titles: <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'Number of MOM titles',
        colorByPoint: true,
        data: obj,
        dataLabels: {
            enabled: true,
            rotation: -90,
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}


function visualizeWinsPerTeamPerSeason(obj){
  Highcharts.chart('wins-per-team-per-season', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Wins Per Team Per Season'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        categories: obj.seasons,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Wins'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: obj.series
});
}


function visualizeSummary(obj){
  const seriesData = [];
  let teams = {};
  //let stadkeys = [...Object.keys(obj)];
  for(let stadium in obj){
    for(let team in obj[stadium]){
      if(!teams[team]){
        teams[team] = [obj[stadium][team]];
      }
      else{
        teams[team].push(obj[stadium][team]);
      }
    }
  }
  //console.log(Object.keys(obj));
  for(let team in teams){
    seriesData.push({'name': team, 'data':teams[team]})
  }
  //console.log(seriesData);

  Highcharts.chart('summary-of-stadium-wins-for-each-team', {
    chart: {
      type: 'bar',
     //height: 800
  },
  
  title: {
      text: 'Stadium Win Summary For Teams'
  },
  xAxis : {
      categories: [...Object.keys(obj)],
      accessibilty: {
        enabled: true
      },
      labels:{
        overflow: 'allow'
      }
  },
  yAxis: {
      //min: 0,
      //offset: 10,
      //height:200,
      title: {
          text: 'Matches Won'
      },
      labels:{
        overflow: 'allow'
      }
      
  },
  legend: {
    reversed: false
  },
  plotOptions: {
      series: {
          stacking: 'normal'
      },
      cropThreshold: 600
  },
    series: seriesData
});

  
}


function visualizeTeamWins(teamTotalWins){
  const seriesData = [];
  for(let team in teamTotalWins){
    seriesData.push([team, teamTotalWins[team]]);
  }

  Highcharts.chart("total-matches-won-by-each-team", {
    chart: {
      type: "column"
    },
    title: {
      text: "Total matches won by each team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total number of matches won"
      }
    },
    series: [
      {
        name: "Team",
        data: seriesData
      }
    ]
  });
}

function visualizeBestBowlers2015(topBowlers2015){
  const seriesData = [];
  for(let bowler in topBowlers2015){
    seriesData.push([bowler, topBowlers2015[bowler]]);
  }

  Highcharts.chart("most-economical-bowler-2015", {
    chart: {
      type: "column"
    },
    title: {
      text: "Most economical bowler of "+chosenYearEB
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Bowler",
        data: seriesData
      }
    ]
  });
}


function visualizeTeamExtras(teamExtras){
  const teamExtrasChosen = teamExtras[chosenYear];
  const seriesData = [];
  for(let team in teamExtrasChosen){
    seriesData.push([team, teamExtrasChosen[team]]);
  }
  //console.log(seriesData);

  Highcharts.chart("extra-runs-conceded-by-each-team-in-2016", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra runs conceded by each team in "+ chosenYear
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Runs"
      }
    },
    series: [
      {
        name: "Team",
        data: seriesData
      }
    ]
  });
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}
