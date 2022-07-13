import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";

import LayoutLoggedIn from "../../components/LayoutLoggedIn/LayoutLoggedIn";
import CostumModal from "../../components/CustomModal/index";
import styles from "../../styles/Payment.module.css";

import Gpay from "../../assets/icon/gpay.png";
import Visa from "../../assets/icon/visa.png";
import Gopay from "../../assets/icon/gopay.png";
import Paypal from "../../assets/icon/paypal.png";
import Dana from "../../assets/icon/dana.png";
import Bca from "../../assets/icon/bca.png";
import Bri from "../../assets/icon/bri.png";
import Ovo from "../../assets/icon/ovo.png";
import Success from "../../assets/icon/success.gif";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

//RequestAxios
import { paymentCheckAxios, confirmPaymentAxios } from "../../modules/payment";
import { currencyFormatter } from "../../helper/formatter";

export default function Payment() {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [idPayment, setIdPayment] = useState("");
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [method, setMethod] = useState("");
  const router = useRouter();
  const orderInfo = useSelector((state) => state.order?.orderInfo);
  const seat = useSelector((state) => state.order?.seat);
  const total = useSelector((state) => state.order?.total);
  const { token } = useSelector((state) => state.auth?.loginData);

  const methodSrc =
    method === "gpay"
      ? Gpay
      : method === "visa"
      ? Visa
      : method === "gopay"
      ? Gopay
      : method === "paypal"
      ? Paypal
      : method === "dana"
      ? Dana
      : method === "bca"
      ? Bca
      : method === "bri"
      ? Bri
      : Ovo;

  useEffect(() => {
    if (!token) {
      router.push(
        {
          pathname: "/auth/login",
          query: { msg: "You need to login first!" },
        },
        "/auth/login"
      );
    }
  }, [token]);

  useEffect(() => {
    paymentCheckAxios(token)
      .then((res) => {
        console.log(res)
        setMethod(res.data?.data.payment_method);
        setPaymentInfo(res.data.data);
        setIdPayment(res.data?.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setShow(true);
    setConfirm(true);
  };
  const handleCancelPayment = (e) => {
    e.preventDefault();
    setShow(true);
    setConfirm(false);
  };
  const primeButtonHandler = () => {
    confirmPaymentAxios(idPayment, token)
      .then((res) => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      });
    setShow(false);
  };
  const cancelHandler = () => {
    setShow(false);
    if (!isError) {
      return router.push("/");
    }
  };
  return (
    <>
      <LayoutLoggedIn title={"Payment"}>
        <main className={styles.mainContainer}>
          {!isSuccess ? (
            <div className={styles.leftPart}>
              <section className={styles.paymentInfo}>
                <div className={styles.title}>Payment Info</div>
                <div className={styles.card}>
                  <div className={styles.cardItem}>
                    <div className={styles.key}>Date {"&"} time</div>
                    <div className={styles.value}>
                      {moment(orderInfo.date).format("dddd, DD MMM YYYY")}
                    </div>
                  </div>
                  <div className={styles.borderLine}></div>
                  <div className={styles.cardItem}>
                    <div className={styles.key}>Movie title</div>
                    <div className={styles.value}>{orderInfo.name}</div>
                  </div>
                  <div className={styles.borderLine}></div>
                  <div className={styles.cardItem}>
                    <div className={styles.key}>Cinema name</div>
                    <div className={styles.value}>{orderInfo.cinema}</div>
                  </div>
                  <div className={styles.borderLine}></div>
                  <div className={styles.cardItem}>
                    <div className={styles.key}>Number of tickets</div>
                    <div className={styles.value}>
                      {paymentInfo.quantity} pieces
                    </div>
                  </div>
                  <div className={styles.borderLine}></div>
                  <div className={styles.cardItem}>
                    <div className={styles.key}>Total payment</div>
                    <div className={styles.value}>
                      {currencyFormatter.format(paymentInfo.total)}
                    </div>
                  </div>
                  <div className={styles.borderLine}></div>
                  <div className={styles.cardItem}>
                    <div className={styles.key}>Payment Method</div>
                    <div className={`btn ${styles.paymentCard}`}>
                      <Image src={methodSrc} className={styles.methodImg} />
                    </div>
                  </div>
                </div>
              </section>
              <section className={styles.buttonContainer}>
                <div onClick={handleCancelPayment} className={styles.payButton}>
                  Cancel Payment
                </div>
                <div
                  onClick={handleConfirmPayment}
                  className={styles.payButton}
                >
                  Confirm Payment
                </div>
              </section>
            </div>
          ) : (
            <>
              <div className={styles.successConfirm}>
                <div className={styles.textSuccess}>
                  <h1>Confirm payment success!</h1>
                </div>
                <Image src={Success} />
                <div className={`d-flex justify-content-center gap-3 mt-5 ${styles.buttonSuccess}`}>
                  <button onClick={() => {
                    router.push(`/`)
                  }} className="border-3 fw-bold btn">
                    BACK TO HOME
                  </button>
                  <button onClick={() => {
                    router.push(`/ticket/${idPayment}`)
                  }} className="border-3 fw-bold btn">
                    CHECK TICKET
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
        <CostumModal
          show={show}
          setShow={setShow}
          title={"Confirm Payment"}
          body={
            isError
              ? errMsg
              : confirm
              ? "Are you sure to confirm?"
              : "Are you sure to cancel confirm?"
          }
          primeButtonHandler={confirm ? primeButtonHandler : cancelHandler}
          isError={isError}
        />
      </LayoutLoggedIn>
    </>
  );
}
