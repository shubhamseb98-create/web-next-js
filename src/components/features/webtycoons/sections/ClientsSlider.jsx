'use client'
import React from 'react'
import Image from 'next/image'
import styles from '../../../../css/webtycoons/ClientsSlider.module.css'

import abrigoLogo from '../assets/clients/abrigo.png'
import amsLogo from '../assets/clients/ams.png'
import austroLogo from '../assets/clients/austrolabs.png'
import blsLogo from '../assets/clients/blsworldschool.png'
import catalystLogo from '../assets/clients/catalyst.png'
import chaircraftLogo from '../assets/clients/chaircraft.png'
import digitalLogo from '../assets/clients/digital.png'
import iupjindalLogo from '../assets/clients/iupjindal.png'
import kasturiLogo from '../assets/clients/kasturi.png'
import lapetiteLogo from '../assets/clients/lapetite.png'
import mahavirLogo from '../assets/clients/mahavir.png'
import maipoLogo from '../assets/clients/maipo.png'
import sabkoolLogo from '../assets/clients/sabkool.png'
import thukralLogo from '../assets/clients/thukral.png'

const clients = [
  { name: 'ABRIGO', image: abrigoLogo, hasBg: true },
  { name: 'ARYA MODEL SCHOOL', image: amsLogo, hasBg: false },
  { name: 'AUSTRO Labs', image: austroLogo, hasBg: false },
  { name: 'BLS WORLD SCHOOL', image: blsLogo, hasBg: true },
  { name: 'CATALYST', image: catalystLogo, hasBg: false },
  { name: 'CHAIR CRAFT INDIA', image: chaircraftLogo, hasBg: true },
  { name: 'DIGITAL by Diksha Vohra', image: digitalLogo, hasBg: false },
  { name: 'IUP Jindal', image: iupjindalLogo, hasBg: true },
  { name: 'KASTURI JEWELLERS', image: kasturiLogo, hasBg: false },
  { name: 'La Petite', image: lapetiteLogo, hasBg: false },
  { name: 'MAHAVIR SENIOR MODEL SCHOOL', image: mahavirLogo, hasBg: true },
  { name: 'Maipo', image: maipoLogo, hasBg: true },
  { name: 'SABKOOL', image: sabkoolLogo, hasBg: true },
  { name: 'THUKRAL', image: thukralLogo, hasBg: false },
]

const ClientsSlider = ({ clientsData, homeExtraData }) => {
  const rawList = clientsData?.length > 0 ? clientsData : clients;
  // Ensure enough items for seamless infinite looping
  const displayClients = rawList.length < 8 ? [...rawList, ...rawList, ...rawList] : rawList;

  return (
    <section className={styles.section} id="clients">
      <div className="container-fluid">
        <div className={`${styles.header} text-center mb-5`}>
          <span className="section-label">{homeExtraData?.client_title || 'Our Clients'}</span>
          <h2 className="section-heading mb-4">
            {homeExtraData?.client_subtitle || 'Trusted by Industry Leaders'}
          </h2>
          <p className={styles.subtitle}>
            {homeExtraData?.client_description || 'Some of the customers to whom we have given excellent services, as a Best Website Designing Company in Delhi.'}
          </p>
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[...displayClients, ...displayClients].map((client, index) => (
              <div key={index} className={styles.logoCard}>
                {client.image ? (
                  <div className={styles.logoWrapper}>
                    <Image 
                      src={typeof client.image === 'string' ? client.image : (client.image?.src || client.image)} 
                      alt={client.name || 'Client Logo'}
                      width={320}
                      height={140}
                      className={styles.clientLogo} 
                    />
                  </div>
                ) : (
                  <div className={styles.placeholderLogo}>{client.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientsSlider
