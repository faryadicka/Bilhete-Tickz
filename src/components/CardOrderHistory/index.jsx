//Import from Package
import { ChevronDown } from 'react-bootstrap-icons';
import moment from 'moment';
//CssModule
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';

const CardOrderHistory = ({ name, show_date, name_cinemas, status, id }) => {
   const router = useRouter();

   return (
      <>
         <div className={styles.cardOrder}>
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
               <div className="col-md-6">
                  <div>
                     <p>{moment(show_date).format('LLLL')}</p>
                     <h4>{name}</h4>
                     <p className={styles.statuspayment}>{status}</p>
                  </div>
               </div>
               <div className="col-md-3">
                  <div>
                     <h4>{name_cinemas}</h4>
                  </div>
               </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-4">
               <div className="col-md-6">
                  <div>
                     <button className={styles.buttonActive}>Ticket in Active</button>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className={`position-relative ${styles.ShowDetails}`}>
                     <p
                        onClick={() => {
                           if (status === 'unpaid') {
                              return router.push(`/payment/${id}`);
                           }
                           router.push(`/ticket/${id}`);
                        }}
                     >
                        Show Details <ChevronDown />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CardOrderHistory;
