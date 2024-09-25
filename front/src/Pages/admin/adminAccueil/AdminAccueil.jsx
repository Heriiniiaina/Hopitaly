import React, { useState } from "react";
import "./AdminAcceuil.css";

export default function AdminAcceuil() {
  return (
    <>
      {/* About the Patient */}
      <div className="card">
        {/* Patient Picture */}
        <p className="user"></p>
        <h3 className="nom">Satoru Gojo</h3>
    
        {/* Additional Information */}
        <div className="info">
          <div className="blood">
            <p>Blood</p>
            <p className="sort">AB+</p>
          </div>
          <div className="height">
            <p>Height</p>
            <p className="cm">173cm</p>
          </div>
          <div className="weight">
            <p>Weight</p>
            <p className="kg">65kg</p>
          </div>
        </div>
      </div>
      <h3 className="prescr">Prescribed Medications</h3>
      {/* Medications and Doctor */}
      <div className="medoc">
        {/* Medications */}
        <div className="scroll">
          <div>
            <div className="about">
              <p className="nom">Paracetamol</p>
              <p className="dose">500mg</p>
            </div>
            <p className="duration">Until fever subsides</p>
            <p className="times">once every 6 hours</p>
          </div>
          <div>
            <div className="about">
              <p className="nom">Ibuprofen</p>
              <p className="dose">400mg</p>
            </div>
            <p className="duration">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
            </p>
            <p className="times">Morning Noon Night</p>
          </div>
          <div>
            <div className="about">
              <p className="nom">Antiviral</p>
              <p className="dose">75mg</p>
            </div>
            <p className="duration">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
            </p>
            <p className="times">Morning and Night</p>
          </div>
          <div>
            <div className="about">
              <p className="nom">Paracetamol</p>
              <p className="dose">500mg</p>
            </div>
            <p className="duration">Until fever subsides</p>
            <p className="times">once every 6 hours</p>
          </div>
        </div>
        {/* Doctor */}
        <div className="docteur">
          <div className="propos">
            <p className="img"></p>
            <div className="ab">
              <h3 className="nom">Dr. Shaun Murphy</h3>
              <p className="hopital">Saint Bonne Aventure Hospital</p>
            </div>
          </div>
          <h3 className="type">Attending Physician</h3>
          <p className="faire">Diagnoses sick patients</p>
          <div className="dateTime">
            <div className="date">
              <h3>Date</h3>
              <h3 className="dateT">09 Sept 2024</h3>
            </div>
            <div className="hour">
              <h3>Time</h3>
              <h3 className="heureT">10:30AM</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="maladies">
        <p>Examinations</p>
        <div className="there">
          <div className="grave">
            <p className="date">21 June 2021</p>
            <h3 className="nom">Hypertensive Crisis</h3>
            <p className="statut">Ongoing treatment</p>
          </div>
          <div className="moyen">
            <p className="date">10 May 2020</p>
            <h3 className="nom">Asthma Crisis</h3>
            <p className="statut">Almost cured</p>
          </div>
          <div className="pas">
            <p className="date">12 October 2015</p>
            <h3 className="nom">Repetitive Allery</h3>
            <p className="statut">Almost cured</p>
          </div>
        </div>
        <div className="rdv">
          <p>Last appointment</p>
          <div className="un soon">
            <p className="type">Tonsillectomy</p>
            <p className="DateTime">
              <span className="date">03 April 2024</span>
              <span className="time">02:17 PM</span>
            </p>
          </div>
          <div className="un morning">
            <p className="type">Simple consultation</p>
            <p className="DateTime">
              <span className="date">03 August 2024</span>
              <span className="time">08:00 AM</span>
            </p>
          </div>
          <div className="un soon">
            <p className="type">Vaccine renewals</p>
            <p className="DateTime">
              <span className="date">07 August 2024</span>
              <span className="time">03:45 PM</span>
            </p>
          </div>
          <div className="un morning">
            <p className="type">Blood Pressure Measurement</p>
            <p className="DateTime">
              <span className="date">12 August 2024</span>
              <span className="time">09:15 AM</span>
            </p>
          </div>
          <div className="un soon">
            <p className="type">Simple consultation</p>
            <p className="DateTime">
              <span className="date">31 August 2024</span>
              <span className="time">03:45 PM</span>
            </p>
          </div>
          <div className="un morning">
            <p className="type">Dental scaling</p>
            <p className="DateTime">
              <span className="date">09 September 2024</span>
              <span className="time">11:09 AM</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
