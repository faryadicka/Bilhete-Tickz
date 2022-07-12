import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import styles from '../../styles/LayoutAuth.module.css';
import { useState } from 'react';

import { TicketDetailedFill } from 'react-bootstrap-icons';

export default function LayoutAuth({ children, title, step = 1 }) {
   const router = useRouter()
   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>
         <main className={styles.globalContainer}>
            <aside className={styles.asideAuth}>
               {title === 'Sign In' ? (
                  <div className={styles.loginContainer}>
                     <div className={styles.BrandNameLogin} onClick={()=> router.push('/')}>
                        Bilhete Tickz
                        <TicketDetailedFill className={styles.logo} />
                     </div>
                     <div className={styles.subTitle}>wait, watch, wow!</div>
                  </div>
               ) : title === 'Forgot Password' ? (
                  <>
                     <div className={styles.BrandName} onClick={()=> router.push('/')}>Bilhete Tickz <TicketDetailedFill className={styles.logo} /></div>
                     <div className={styles.title}>Lets reset your password</div>
                     <div className={styles.info}>To be able to use your account again, please complete the following steps.</div>
                     <div className={styles.stepContainer}>
                        <div className={step === 1 ? styles.bullet : styles.bulletInactive}>1</div>
                        <div className={styles.step}>Fill your complete email</div>
                     </div>
                     <div className={styles.stepContainer}>
                        <div className={step === 2 ? styles.bullet : styles.bulletInactive}>2</div>
                        <div className={styles.step}>Activate your email</div>
                     </div>
                     <div className={styles.stepContainer}>
                        <div className={step === 3 ? styles.bullet : styles.bulletInactive}>3</div>
                        <div className={styles.step}>Enter your new password</div>
                     </div>
                     <div className={styles.stepContainer}>
                        <div className={step === 4 ? styles.bullet : styles.bulletInactive}>4</div>
                        <div className={styles.step}>Done</div>
                     </div>
                  </>
               ) : (
                  <>
                     <div className={styles.BrandName} onClick={()=> router.push('/')}>Bilhete Tickz <TicketDetailedFill className={styles.logo} /></div>
                     <div className={styles.title}>Lets build your account</div>
                     <div className={styles.info}>To be a loyal moviegoer and access all of features, your details are required.</div>
                     <div className={styles.stepContainer}>
                        <div className={step === 1 ? styles.bullet : styles.bulletInactive}>1</div>
                        <div className={styles.step}>Fill your additional details</div>
                     </div>
                     <div className={styles.stepContainer}>
                        <div className={step === 2 ? styles.bullet : styles.bulletInactive}>2</div>
                        <div className={styles.step}>Activate your account</div>
                     </div>
                     <div className={styles.stepContainer}>
                        <div className={step === 3 ? styles.bullet : styles.bulletInactive}>3</div>
                        <div className={styles.step}>Done</div>
                     </div>
                  </>
               )}
            </aside>
            {children}
         </main>
      </>
   );
}
