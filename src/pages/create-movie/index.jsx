//Import from Package
import { Modal } from "react-bootstrap";
import { ChevronDown, X } from "react-bootstrap-icons";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import BarChart from "../../components/Dashboard/index";
//ComponentsLocal
import CustomModal from "../../components/CustomModal/index";
import LayoutLoggedIn from "../../components/LayoutLoggedIn/LayoutLoggedIn";
//Compenents Next
import Image from "next/image";
//CssModule
import styles from "../../styles/CreateMovies.module.css";
//Assets
import Location from "../../assets/icon/location.png";
import Default from "../../assets/img/default.jpg";
//Axios
import {
  getCinemasBandungAxios,
  getCinemasJakartaAxios,
} from "../../modules/cinemas";
import { createMoviesAxios, getAllMoviesHomeAxios } from "../../modules/movies";


const CreateMovie = () => {
  const token = useSelector((state) => state.auth.loginData?.token);
  const [showModal, setShowModal] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [drop, setDrop] = useState(false);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [location, setLocation] = useState([]);
  const [time, setTime] = useState([]);
  const [cinemaId, setCinemaId] = useState([]);
  const [name, setName] = useState([]);
  const [fill, setFill] = useState("week")
  // const [chartData, setChartData] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    release_date: "",
    cast: "",
    hours: "",
    minute: "",
    duration: "",
    synopsis: "",
    img: "",
    price: "",
    director: "",
    show_date: "",
  });
  const inputFile = useRef();
  const router = useRouter();

  useEffect(() => {
        getAllMoviesHomeAxios()
            .then((res) => {
                // console.log(res)
                setName(res.data?.data);
            }).catch((err) => {
                console.log(err)
            })
    }, [])

  const getCinemasBandung = () => {
    getCinemasBandungAxios()
      .then((res) => {
        console.log(res);
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDrop(!drop);
  };
  const getCinemasJakarta = () => {
    getCinemasJakartaAxios()
      .then((res) => {
        console.log(res);
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDrop(!drop);
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
        setForm({ ...form, img: file });
      };
      reader.readAsDataURL(file);
    }
  };
  const formCreateMovie = () => {
    const body = new FormData();
    if (form.name !== "") {
      body.append("name", form.name);
    }
    if (form.category !== "") {
      body.append("category", form.category);
    }
    if (form.release_date !== "") {
      body.append("release_date", form.release_date);
    }
    if (form.duration !== "") {
      body.append("duration", form.duration);
    }
    if (form.cast !== "") {
      body.append("cast", form.cast);
    }
    if (form.synopsis !== "") {
      body.append("synopsis", form.synopsis);
    }
    if (form.img !== "") {
      body.append("img", form.img);
    }
    if (form.price !== "") {
      body.append("price", form.price);
    }
    if (form.director !== "") {
      body.append("director", form.director);
    }
    if (form.show_date !== "") {
      body.append("show_date", form.show_date);
    }
    if (time.length !== 0) {
      body.append("time", JSON.stringify(time));
    }
    if (cinemaId.length !== 0) {
      body.append("cinemas_id", JSON.stringify(cinemaId));
    }
    if (location.length !== 0) {
      body.append("location", JSON.stringify(location));
    }
    return body;
  };

  const primeButtonHandler = () => {
    setForm({});
    setShow(false);
    if (!isError) {
      return router.push("/movies/nowshowing");
    }
  };

  const handleCreateMovies = (e) => {
    e.preventDefault();
    console.log(token);
    console.log(location);
    const body = formCreateMovie();
    createMoviesAxios(body, token)
      .then((res) => {
        console.log(res);
        setIsError(false);
        setShow(true);
        setSuccessMsg(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response?.data.message.msg);
        setIsError(true);
        setShow(true);
      });
  };
  return (
    <LayoutLoggedIn title="Create Movie">
      <div className={`${styles.containerCreateMovie}`}>
        <div className="container d-flex flex-column flex-md-row gap-4">
          <div className="col-md-8">
            <h5 className="fw-bold">Movie Description</h5>
            <div className={`${styles.cardDescription}`}>
              <div className="d-flex p-4 gap-4">
                <div
                  onClick={(e) => {
                    inputFile.current.click();
                    e.preventDefault();
                  }}
                  className="btn col-md-4 p-4 border border-1 rounded-3"
                >
                  <Image
                    src={previewImg ? previewImg : Default}
                    width={"150px"}
                    height={"250px"}
                    className={styles.image}
                  />
                </div>
                <input
                  type="file"
                  hidden
                  ref={inputFile}
                  onChange={handleInputFile}
                />
                <div className="col-md-7">
                  <div className="form-group">
                    <label
                      htmlFor="nameMovie"
                      className={`fw-light ${styles.labelFont}`}
                    >
                      Name Movie
                    </label>
                    <input
                      type="text"
                      className={`form-control mt-2 bg-light ${styles.inputForm}`}
                      id="nameMovie"
                      aria-describedby="emailHelp"
                      placeholder="Enter Title Film"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group my-3">
                    <label
                      htmlFor="category"
                      className={`fw-light ${styles.labelFont}`}
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      className={`form-control mt-2 bg-light ${styles.inputForm}`}
                      id="category"
                      aria-describedby="emailHelp"
                      placeholder="Enter category Film"
                      value={form.category}
                      onChange={(e) => {
                        setForm({ ...form, category: e.target.value });
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <div className="col-md-6">
                      <div className="form-group my-3">
                        <label
                          htmlFor="category"
                          className={`fw-light ${styles.labelFont}`}
                        >
                          Realease Date
                        </label>
                        <input
                          type="date"
                          className={`form-control mt-2 bg-light ${styles.inputForm}`}
                          id="category"
                          aria-describedby="emailHelp"
                          placeholder="Enter category Film"
                          value={form.release_date}
                          onChange={(e) => {
                            setForm({ ...form, release_date: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group my-3">
                        <label
                          htmlFor="category"
                          className={`fw-light ${styles.labelFont}`}
                        >
                          Duration (hour / minute)
                        </label>
                        <div className="d-flex gap-2">
                          <input
                            type="text"
                            className={`form-control mt-2 bg-light ${styles.inputForm}`}
                            id="category"
                            aria-describedby="emailHelp"
                            placeholder="Hours"
                            value={form.hours}
                            onChange={(e) => {
                              setForm({ ...form, hours: e.target.value });
                            }}
                          />
                          <input
                            type="text"
                            className={`form-control mt-2 bg-light ${styles.inputForm}`}
                            id="category"
                            aria-describedby="emailHelp"
                            placeholder="Minutes"
                            value={form.minute}
                            onChange={(e) => {
                              setForm({ ...form, minute: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex px-4 gap-4">
                <div className="col-md-4">
                  <div className="form-group my-3">
                    <label
                      htmlFor="category"
                      className={`fw-light ${styles.labelFont}`}
                    >
                      Director
                    </label>
                    <input
                      type="text"
                      className={`form-control mt-2 bg-light ${styles.inputForm}`}
                      id="category"
                      aria-describedby="emailHelp"
                      placeholder="Enter Director Name"
                      value={form.director}
                      onChange={(e) => {
                        setForm({ ...form, director: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="form-group my-3">
                    <label
                      htmlFor="casts"
                      className={`fw-light ${styles.labelFont}`}
                    >
                      Casts
                    </label>
                    <input
                      type="text"
                      className={`form-control mt-2 bg-light ${styles.inputForm}`}
                      id="casts"
                      aria-describedby="emailHelp"
                      placeholder="Enter Casts Name"
                      value={form.cast}
                      onChange={(e) => {
                        setForm({ ...form, cast: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-3 px-4">
                <label
                  htmlFor="synopsis"
                  className={`fw-light ${styles.labelFont}`}
                >
                  Synopsis
                </label>
                <div>
                  <textarea
                    name="synopsis"
                    id="synopsis"
                    cols="30"
                    rows="10"
                    placeholder="Enter synopsis"
                    className={`form-control mt-2 bg-light ${styles.inputForm}`}
                    value={form.synopsis}
                    onChange={(e) => {
                      setForm({ ...form, synopsis: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="form-group my-3 px-4">
                <label
                  htmlFor="price"
                  className={`fw-light ${styles.labelFont}`}
                >
                  Price
                </label>
                <div>
                  <input
                    type="text"
                    name="shotimes"
                    id="showtimes"
                    className={`form-control mt-1 bg-light w-50 ${styles.inputForm}`}
                    value={form.price}
                    placeholder="Enter price of ticket"
                    onChange={(e) => {
                      setForm({ ...form, price: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Premiere Location</h5>
            <div className={`${styles.cardDescription}`}>
              <div className={`${styles.dropMenu}`}>
                <div
                  onClick={() => {
                    setDrop(!drop);
                    setCinemaId([]);
                  }}
                  className={`d-flex justify-content-between align-items-center ${styles.cardDrop}`}
                >
                  <div className="d-flex align-center-center gap-2 pt-3 col-md-7">
                    <div className="ms-4">
                      <Image src={Location} />
                    </div>
                    <p>Location</p>
                  </div>
                  <div className="col-md-2">
                    <ChevronDown />
                  </div>
                </div>
                {drop ? (
                  <div className={`${styles.menuLoc} d-flex flex-column`}>
                    <button
                      onClick={getCinemasJakarta}
                      className={`btn my-2 ${styles.btnLoc}`}
                    >
                      Jakarta
                    </button>
                    <button
                      onClick={getCinemasBandung}
                      className={`btn my-2 ${styles.btnLoc}`}
                    >
                      Bandung
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="d-flex flex-wrap gap-3 justify-content-between py-4">
                {location.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCinemaId([...cinemaId, item.id]);
                      let newSelectCinemas = [...cinemaId];
                      if (newSelectCinemas.includes(item.id)) {
                        setCinemaId(
                          newSelectCinemas.filter(
                            (cinema) => cinema !== item.id
                          )
                        );
                      }
                    }}
                    className={`btn col-md-1 mt-4 ${cinemaId.includes(item.id)
                      ? styles.chooseCinema
                      : styles.cinema
                      }`}
                  >
                    <Image
                      src={item.pictures ? item.pictures : <></>}
                      width={100}
                      height={30}
                      alt="cine"
                    />
                  </div>
                ))}
              </div>
            </div>
            <h5 className="fw-bold my-3">Showtimes</h5>
            <div className={`${styles.cardDescription}`}>
              <input
                pattern="\d{1,2}/\d{1,2}/\d{4}"
                type="date"
                name="shotimes"
                id="showtimes"
                className={styles.dateShowtimes}
                value={form.show_date}
                onChange={(e) => {
                  setForm({ ...form, show_date: e.target.value });
                }}
              />
              <div className="d-flex flex-wrap gap-1 py-4">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setForm({
                      ...form,
                      duration: form.hours + ":" + form.minute,
                    });
                    console.log(form);
                  }}
                  className="btn btn-outline-primary "
                >
                  +
                </button>
                <button
                  onClick={() => {
                    setTime([]);
                  }}
                  className="ms-2 btn btn-outline-primary "
                >
                  RESET
                </button>
                {showTime
                  ? time.map((item) => (
                    <button key={item} className="btn">
                      {item}
                    </button>
                  ))
                  : null}
              </div>
            </div>
            <button
              onClick={handleCreateMovies}
              className={`mt-5 w-100 ${styles.btnCreate}`}
            >
              Create Movie
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <h5 className="fw-bold">Sales Charts</h5>
          <div className={`${styles.cardDashboard}`}>
            <div className="d-flex">
              <h6 className="border-bottom border-2 pb-2 border-primary">Based on Movie</h6>
              <div clasName="d-flex justify-content-between">
                    <select onChange={(e) => {
                          router.push(`/create-movie?id=${e.target.value}&created_at=${fill}`)
                        }}>
                      {name.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                    <select onChange={(e) => {
                          setFill(e.target.value)
                          // router.push(`/create-movie?name=${router.query.name}&created_at=${e.target.value}`)
                        }}>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className={styles.chartCard}>
              <BarChart/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>Choose time</Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-2">
            <button
              onClick={() => {
                if (!time.includes("08:30am")) {
                  setTime([...time, "08:30am"]);
                }
                setShowTime(true);
              }}
              className="btn btn-outline-primary"
            >
              08:30am
            </button>
            <button
              onClick={() => {
                if (!time.includes("10:30am")) {
                  setTime([...time, "10:30am"]);
                }
                setShowTime(true);
              }}
              className="btn btn-outline-primary"
            >
              10:30am
            </button>
            <button
              onClick={() => {
                if (!time.includes("12:00am")) {
                  setTime([...time, "12:00am"]);
                }
                setShowTime(true);
              }}
              className="btn btn-outline-primary"
            >
              12:00am
            </button>
            <button
              onClick={() => {
                if (!time.includes("04:30am")) {
                  setTime([...time, "04:30am"]);
                }
                setShowTime(true);
              }}
              className="btn btn-outline-primary"
            >
              04:30am
            </button>
            <button
              onClick={() => {
                if (!time.includes("07:30pm")) {
                  setTime([...time, "07:30pm"]);
                }
                setShowTime(true);
              }}
              className="btn btn-outline-primary"
            >
              07:30pm
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <CustomModal
        show={show}
        setShow={setShow}
        title={isError ? "Error" : "Success"}
        body={isError ? errMsg : successMsg}
        primeButtonHandler={primeButtonHandler}
        isError={isError}
      />
    </LayoutLoggedIn>
  );
};

export default CreateMovie;
