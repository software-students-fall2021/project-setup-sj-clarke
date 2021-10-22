


import './header.css';

import React from 'react'

import Title from './header.js'
import './homeScreen.css'

function Home(){
    return (
        <div className= "Home">
            <Title/>
            <title className ="CurrentTripTitle">Mexico 2021

            <button type="button" class="btn btn-secondary btn-sm">More info</button>
            </title>  

            <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Charger</th>
      <th scope="col">Chargee</th>
      <th scope="col">Expense Amount</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">11</th>
      <td>Mark</td>
      <td>Sarah</td>
      <td>$90</td>
    </tr>
    <tr>
      <th scope="row">10</th>
      <td>Jack</td>
      <td>Mike</td>
      <td>$50</td>
    </tr>
    <tr>
      <th scope="row">10</th>
      <td>Mark</td>
      <td>Sarah</td>
      <td>$90</td>
    </tr>
    <tr>
      <th scope="row">9</th>
      <td>Jack</td>
      <td>Mike</td>
      <td>$50</td>
    </tr>
    <tr>
      <th scope="row">8</th>
      <td>Sarah</td>
      <td>Mexico 2021</td>
      <td>$900</td>
    </tr>
    <tr>
      <th scope="row">7</th>
      <td>Mark</td>
      <td>Sarah</td>
      <td>$90</td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>Jack</td>
      <td>Mike</td>
      <td>$50</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Sarah</td>
      <td>Mexico 2021</td>
      <td>$900</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Mark</td>
      <td>Sarah</td>
      <td>$90</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Jack</td>
      <td>Mike</td>
      <td>$50</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Sarah</td>
      <td>Mexico 2021</td>
      <td>$900</td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Sarah</td>
      <td>Mexico 2021</td>
      <td>$900</td>
    </tr>
  </tbody>
</table>
        </div>



    )
}

export default Home; 