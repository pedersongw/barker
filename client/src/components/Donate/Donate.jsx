import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import logo from "../../images/logo.png";
import styles from "./Donate.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import image1 from "../../FundraisingImages/goal1images/image1.jpg";
import image2 from "../../FundraisingImages/goal1images/image2.jpg";
import image3 from "../../FundraisingImages/goal1images/20211002_150840.jpg";
import image4 from "../../FundraisingImages/goal1images/20211002_151239.jpg";
import image21 from "../../FundraisingImages/goal2images/20211002_150515.jpg";
import image22 from "../../FundraisingImages/goal2images/20211002_150601.jpg";
import image23 from "../../FundraisingImages/goal2images/20211002_151607.jpg";
import image31 from "../../FundraisingImages/goal3images/20211002_150715.jpg";
import image32 from "../../FundraisingImages/goal3images/20211002_150744 (2).jpg";

class Donate extends React.Component {
  state = {
    width: window.innerWidth,
    staging: 1,
    oneClass: styles.imgOne,
    twoClass: styles.imgTwo,
    threeClass: styles.imgThree,
    fourClass: styles.imgHide,
    oneId: null,
    twoId: null,
    threeId: null,
    fourId: null,
    oneImages: [],
    twoImages: ["image-one", "image-two", "image-three", "image-four"],
    threeImages: ["image-two-one", "image-two-two", "image-two-three"],
    fourImages: ["image-three-one", "image-three-two"],
    noClick: false,
    timeout: null,
  };

  constructor(props) {
    super(props);
    this.slideOne = React.createRef();
    this.slideTwo = React.createRef();
    this.slideThree = React.createRef();
    this.slideFour = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("keydown", () => this.keyPressed());
    let imageOne = document.getElementById("image-one");
    let imageTwoOne = document.getElementById("image-two-one");
    let imageThreeOne = document.getElementById("image-three-one");
    imageOne.style.display = "block";
    imageTwoOne.style.display = "block";
    imageThreeOne.style.display = "block";
    this.handleImageRotation();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
    window.clearInterval(this.state.timeout);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  changeStaging = (direction) => {
    const {
      staging,
      oneClass,
      twoClass,
      threeClass,
      fourClass,
      oneId,
      twoId,
      threeId,
      fourId,
      noClick,
    } = this.state;
    if (noClick) {
      return;
    }
    this.setState({ noClick: true });
    setTimeout(() => {
      this.setState({ noClick: false });
    }, 1100);
    if (staging === 1) {
      if (direction === "left") {
        this.setState({
          oneClass: styles.imgHide,
          twoId: styles.twoToOne,
          threeId: styles.threeToTwo,
          fourClass: styles.imgThree,
          staging: 4,
        });
        setTimeout(
          () =>
            this.setState({
              twoClass: styles.imgOne,
              twoId: null,
              threeClass: styles.imgTwo,
              threeId: null,
            }),

          1000
        );
      } else {
        this.setState({
          twoId: styles.twoToThree,
          threeClass: styles.imgHide,
          oneId: styles.oneToTwo,
          fourClass: styles.imgOne,
          staging: 2,
        });
        setTimeout(() => {
          this.setState({
            twoClass: styles.imgThree,
            twoId: null,
            oneClass: styles.imgTwo,
            threeId: null,
          });
        }, 1000);
      }
    } else if (staging === 2) {
      if (direction === "left") {
        this.setState({
          oneId: styles.twoToOne,
          twoId: styles.threeToTwo,
          threeClass: styles.imgThree,
          fourClass: styles.imgHide,
          staging: 1,
        });
        setTimeout(() => {
          this.setState({
            oneClass: styles.imgOne,
            oneId: null,
            twoClass: styles.imgTwo,
            twoId: null,
          });
        }, 1000);
      } else {
        this.setState({
          oneId: styles.twoToThree,
          twoClass: styles.imgHide,
          threeClass: styles.imgOne,
          fourId: styles.oneToTwo,
          staging: 3,
        });
        setTimeout(() => {
          this.setState({
            oneClass: styles.imgThree,
            oneId: null,
            fourClass: styles.imgTwo,
            fourId: null,
          });
        }, 1000);
      }
    } else if (staging === 3) {
      if (direction === "left") {
        this.setState({
          oneId: styles.threeToTwo,
          twoClass: styles.imgThree,
          threeClass: styles.imgHide,
          fourId: styles.twoToOne,
          staging: 2,
        });
        setTimeout(() => {
          this.setState({
            oneClass: styles.imgTwo,
            oneId: null,
            fourClass: styles.imgOne,
            fourId: null,
          });
        }, 1000);
      } else {
        this.setState({
          oneClass: styles.imgHide,
          twoClass: styles.imgOne,
          threeId: styles.oneToTwo,
          fourId: styles.twoToThree,
          staging: 4,
        });
        setTimeout(() => {
          this.setState({
            threeClass: styles.imgTwo,
            threeId: null,
            fourClass: styles.imgThree,
            fourId: null,
          });
        }, 1000);
      }
    } else {
      if (direction === "left") {
        this.setState({
          oneClass: styles.imgThree,
          twoClass: styles.imgHide,
          threeId: styles.twoToOne,
          fourId: styles.threeToTwo,
          staging: 3,
        });
        setTimeout(() => {
          this.setState({
            threeClass: styles.imgOne,
            threeId: null,
            fourClass: styles.imgTwo,
            fourId: null,
          });
        }, 1000);
      } else {
        this.setState({
          oneClass: styles.imgOne,
          twoId: styles.oneToTwo,
          threeId: styles.twoToThree,
          fourClass: styles.imgHide,
          staging: 1,
        });
        setTimeout(() => {
          this.setState({
            twoClass: styles.imgTwo,
            twoId: null,
            threeClass: styles.imgThree,
            threeId: null,
          });
        }, 1000);
      }
    }
    setTimeout(() => this.handleImageRotation(), 1000);
  };

  handleImageRotation = () => {
    window.clearInterval(this.state.timeout);
    const {
      staging,
      oneImages,
      twoImages,
      threeImages,
      fourImages,
    } = this.state;
    let arr;
    let stateVar;
    if (staging === 1) {
      arr = [...twoImages];
      stateVar = "twoImages";
    } else if (staging === 2) {
      return;
    } else if (staging === 3) {
      arr = [...fourImages];
      stateVar = "fourImages";
    } else if (staging === 4) {
      arr = [...threeImages];
      stateVar = "threeImages";
    }
    let currentImage = document.getElementById(arr[0]);
    let nextImage = document.getElementById(arr[1]);
    currentImage.style.display = "block";
    let timeout = window.setTimeout(() => {
      console.log(arr);
      let item = arr.shift();
      arr.push(item);
      console.log("new arr", arr);
      currentImage.style.display = "none";
      nextImage.style.display = "block";
      this.setState({ [stateVar]: arr });
      this.handleImageRotation();
    }, 3000);
    this.setState({ timeout: timeout });
  };

  keyPressed = () => {
    console.log(this.state);
  };

  rotateImages = () => {
    let elementOne = document.getElementById("image-one");
    setTimeout(() => {
      elementOne.style.display = "none";
    }, 4000);
  };

  donateClicked = () => {
    window.open(
      "https://checkout.square.site/merchant/E0PV1XN7ZZT4J/checkout/3MHF2PYMB66O7TQQM2CIJ4M5?fbclid=IwAR3HLIEAZ9JasKMrDvYqaQo7REExIyPRGsosTU2jLEQIzKGlVwOK13tCq7o",
      "_blank"
    );
  };

  render() {
    const {
      oneClass,
      twoClass,
      threeClass,
      fourClass,
      oneId,
      twoId,
      threeId,
      fourId,
    } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopMobileNavBar />
        {this.state.width > 800 ? (
          <div className={styles.desktopHeaderSpacer}></div>
        ) : (
          <div className={styles.MobileHeaderSpacer}></div>
        )}
        <div
          className={this.state.width < 800 ? styles.gridMobile : styles.grid}
        >
          <div id={styles.one} onClick={() => this.changeStaging("right")}>
            <FaAngleLeft />
          </div>
          <div
            id={this.state.width < 800 ? styles.twoMobile : styles.twoDesktop}
          >
            <div className={oneClass} id={oneId} ref={this.slideOne}>
              <div
                className={
                  this.state.width < 800 ? styles.cardMobile : styles.card
                }
              >
                {this.state.width > 800 && (
                  <div className={styles.logoWrapper}>
                    <img alt="Barker Field Logo" src={logo}></img>
                  </div>
                )}

                <div
                  className={styles.title}
                  id={this.state.width < 800 ? styles.mobileTitleOne : null}
                >
                  <h3 className={styles["h3"]}>
                    Help us keep Barker Field safe, clean, and available to the
                    community!
                  </h3>
                  <h3 className={styles["h3"]}>
                    100% of your donation goes directly to the betterment of the
                    park.
                  </h3>
                  <button
                    className={styles.button}
                    onClick={() => this.donateClicked()}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
            <div className={twoClass} id={twoId} ref={this.slideTwo}>
              <div
                className={
                  this.state.width < 800 ? styles.cardMobile : styles.card
                }
              >
                <div className={styles.imageWrapper}>
                  <img
                    alt="image"
                    src={image1}
                    className={styles.image}
                    id="image-one"
                  ></img>
                  <img
                    alt="image"
                    src={image2}
                    className={styles.image}
                    id="image-two"
                  ></img>
                  <img
                    alt="image"
                    src={image3}
                    className={styles.image}
                    id="image-three"
                  ></img>
                  <img
                    alt="image"
                    src={image4}
                    className={styles.image}
                    id="image-four"
                  ></img>
                </div>

                {this.state.width > 800 && (
                  <div className={styles.title}>
                    <h3 className={styles["h3"]}>Goal # 1</h3>
                    <h4 className={styles["h4"]}>
                      Provide a 4” mulch base for upper and middle parts of the
                      large dog park.
                    </h4>
                    <h5 className={styles["h5"]}>Cost: $6,625</h5>
                    <button
                      className={styles.button}
                      onClick={() => this.donateClicked()}
                    >
                      Donate
                    </button>
                  </div>
                )}

                <div
                  className={
                    this.state.width < 800
                      ? styles.description
                      : styles.descriptionDesktop
                  }
                >
                  {this.state.width < 800 && (
                    <div className={styles.title}>
                      <h4 className={styles["h4"]}>
                        Goal # 1: Provide a 4” mulch base for upper and middle
                        parts of the large dog park.
                      </h4>
                      <h5 className={styles["h5"]}>Cost: $6,625</h5>

                      <button
                        className={styles.button}
                        onClick={() => this.donateClicked()}
                      >
                        Donate
                      </button>
                    </div>
                  )}

                  <p className={styles.p}>
                    A large area of the dog park is completely exposed, making
                    it dusty in the summer months and muddy in wet weather. We
                    know this is a nuisance for pet goers, and under the right
                    conditions makes the dog park unusable.
                  </p>
                  <p className={styles.p}>
                    The investment in a large order of playground grade mulch
                    will vastly improve this area of the park. This base will
                    slow-- but not eradicate-- erosion. This will also cover the
                    exposed bases of the shelters at the park. Mulch will be an
                    on-going investment for the park.
                  </p>
                  <p className={styles.p}>
                    Chris Schwartz, City of Richmond Parks and Rec, estimates
                    that the top half of Barker Field is 21,500 square feet. At
                    a four inch depth, this comes to 265 cubic yards of mulch.
                    If installed by volunteers, we can anticipate acquiring the
                    mulch for $25/cubic yard. The total investment required will
                    be $6,625.
                  </p>
                </div>
              </div>
            </div>
            <div className={threeClass} id={threeId} ref={this.slideThree}>
              <div
                className={
                  this.state.width < 800 ? styles.cardMobile : styles.card
                }
              >
                <div className={styles.imageWrapper}>
                  <img
                    alt="image"
                    src={image21}
                    className={styles.image}
                    id="image-two-one"
                  ></img>
                  <img
                    alt="image"
                    src={image22}
                    className={styles.image}
                    id="image-two-two"
                  ></img>
                  <img
                    alt="image"
                    src={image23}
                    className={styles.image}
                    id="image-two-three"
                  ></img>
                </div>
                {this.state.width > 800 && (
                  <div className={styles.title}>
                    <h3 className={styles["h3"]}>Goal # 2</h3>
                    <h4 className={styles["h4"]}>
                      Fill ditches and holes prior to mulch donation.
                    </h4>
                    <h5 className={styles["h5"]}>
                      Cost: Free, unless unable to find a donor.
                    </h5>
                    <button
                      className={styles.button}
                      onClick={() => this.donateClicked()}
                    >
                      Donate
                    </button>
                  </div>
                )}

                <div
                  className={
                    this.state.width < 800
                      ? styles.description
                      : styles.descriptionDesktop
                  }
                >
                  {this.state.width < 800 && (
                    <div className={styles.title}>
                      <h4 className={styles["h4"]}>
                        Goal # 2: Fill ditches and holes prior to mulch
                        donation.
                      </h4>
                      <h5 className={styles["h5"]}>
                        Cost: Free, unless unable to find a donor.
                      </h5>
                      <button
                        className={styles.button}
                        onClick={() => this.donateClicked()}
                      >
                        Donate
                      </button>
                    </div>
                  )}
                  <p className={styles.p}>
                    These holes and ditches pose a huge safety hazard for dogs
                    and owners. If we do not make an effort to fill them prior
                    to the mulch delivery, it could make them invisible and make
                    them even more dangerous.
                  </p>
                  <p className={styles.p}>
                    The large holes can be filled by moving dirt already in the
                    park (see Goal #3). The ditches have naturally formed, so
                    filling them with dirt will not resolve the issue. Instead,
                    we plan to fill the ditches with gravel. This will prevent
                    erosion to other areas of the park, as well as creating a
                    safer surface for the park.
                  </p>
                  <p className={styles.p}>
                    We are currently seeking in-kind donations for the gravel in
                    order to keep down costs. Please contact
                    friendsofbarkerfieldrva@gmail.com if you are interested in
                    supporting us.
                  </p>
                </div>
              </div>
            </div>
            <div className={fourClass} id={fourId} ref={this.slideFour}>
              <div
                className={
                  this.state.width < 800 ? styles.cardMobile : styles.card
                }
              >
                <div className={styles.imageWrapper}>
                  <img
                    alt="image"
                    src={image31}
                    className={styles.image}
                    id="image-three-one"
                  ></img>
                  <img
                    alt="image"
                    src={image32}
                    className={styles.image}
                    id="image-three-two"
                  ></img>
                </div>
                {this.state.width > 800 && (
                  <div className={styles.title}>
                    <h3 className={styles["h3"]}>Goal # 3</h3>
                    <h4 className={styles["h4"]}>
                      Remediate the erosion build up that is, in effect,
                      “lowering” the fence at the bottom of the large dog park.
                    </h4>
                    <h5 className={styles["h5"]}>Cost: $400</h5>
                    <button
                      className={styles.button}
                      onClick={() => this.donateClicked()}
                    >
                      Donate
                    </button>
                  </div>
                )}

                <div
                  className={
                    this.state.width < 800
                      ? styles.description
                      : styles.descriptionDesktop
                  }
                >
                  {this.state.width < 800 && (
                    <div className={styles.title}>
                      <h4 className={styles["h4"]}>
                        Goal # 3: Remediate the erosion build up that is, in
                        effect, “lowering” the fence at the bottom of the large
                        dog park.
                      </h4>
                      <h5 className={styles["h5"]}>Cost: $400</h5>
                      <button
                        className={styles.button}
                        onClick={() => this.donateClicked()}
                      >
                        Donate
                      </button>
                    </div>
                  )}
                  <p className={styles.p}>
                    A large area of the dog park is completely exposed, making
                    it dusty in the summer months and muddy in wet weather. We
                    know this is a nuisance for pet goers, and under the right
                    conditions makes the dog park unusable.
                  </p>
                  <p className={styles.p}>
                    The investment in a large order of playground grade mulch
                    will vastly improve this area of the park. This base will
                    slow-- but not eradicate-- erosion. This will also cover the
                    exposed bases of the shelters at the park. Mulch will be an
                    on-going investment for the park.
                  </p>
                  <p className={styles.p}>
                    Chris Schwartz, City of Richmond Parks and Rec, estimates
                    that the top half of Barker Field is 21,500 square feet. At
                    a four inch depth, this comes to 265 cubic yards of mulch.
                    If installed by volunteers, we can anticipate acquiring the
                    mulch for $25/cubic yard. The total investment required will
                    be $6,625.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id={styles.three} onClick={() => this.changeStaging("left")}>
            <FaAngleRight />
          </div>
        </div>
      </div>
    );
  }
}

export default Donate;
