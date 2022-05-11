import React from "react";
import TopMobileNavBar from "../Navs/TopMobileNavBar";

class Main extends React.Component {
  state = {
    width: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    return (
      <div>
        <TopMobileNavBar page="home" />
        <h1>Main</h1>
        <h2>The Dog Park</h2>
        <p>
          Barker Field opened its gates in October of 1998 as Richmond’s first
          ‘official’ off-leash dog park. The city set aside the land with the
          agreement that most everything to make it a dog park would be provided
          by its patrons. R-DOG, Richmond Dog Owners’ Group, raised money for
          the fence and managed Barker Field for its first years. Friends of
          Barker Field organized in 2005 as a partner of Enrichmond Foundation.
        </p>
        <h2> Our Mission</h2>
        <p>
          With volunteer labor and private donations, we continually improve
          Barker Field Dog Park's facilities for both dogs and their owners.
        </p>
        <h2>Rules for Barker Field</h2>
        <ul>
          <li>
            The City of Richmond and Friends of Barker Field dog park are not
            responsible or liable for any injury to your person, dog, children,
            or property while you are in the park area.
          </li>
          <li>
            No dogs deemed "dangerous" by a court of law may enter the park.
            Richmond City Ordinance Section 4-241. Dangerous Dogs
          </li>
          <li>
            PLEASE CONTROL YOUR DOG. Discourage your dog from any and all
            aggressive and/or mounting behaviors and respect the wishes of other
            dog owners.
          </li>
          <li>
            Any dog acting in an unfriendly or aggressive manner must
            immediately leave the park.
          </li>
          <li>
            All persons entering the part are responsible for the animals they
            bring in. Please closely supervise your dog as you will be held
            liable for any damages caused by your dog to person, pets, and
            property.
          </li>
          <li>
            All incidents involving a bite to a person or animal should be
            reported immediately to Richmond Animal Care and Control (RACC)
            804-646-5573 and City of Richmond Health Department (804) 205-3912.
          </li>
          <li>
            All dogs must be leashed when not in the confines of the dog park.
            Richmond City Ordinance Section 4-243.
          </li>
          <li>
            Dogs must be accompanied by an owner or caretaker. Any animal left
            on the premises without supervision will be considered abandoned and
            impounded at the Richmond City Animal Shelter.
          </li>
          <li>
            Please clean up after your dog and yourself. Place all waste and
            litter in the proper receptacles. Let's keep the dog park safe and
            clean for all to enjoy. Richmond City Ordinance Section 4-90 Animal
            Excreta or Waste.
          </li>
          <li>
            Please discourage your dog from digging, and before leaving the park
            refill any holes they may have dug. Shovels have been provided for
            this purpose.
          </li>
          <li>
            All female dogs who enter the park must be spayed and all male dogs
            must be neutered.
          </li>
          <li>
            All dogs must wear a collar with a proper license attached. Richmond
            City Ordinance Section 4-186.
          </li>
          <li>
            All dogs within the park must have a current rabies vaccination and
            the vaccination tag on their collar and be older than four months of
            age. Richmond City Ordinance Section 4-186.
          </li>
          <li>
            No food, alcohol, glass, or glass bottles are allowed inside the
            park.
          </li>
          <li>
            Please be respectful of both people and pets using the dog park.
            Refrain from using foul language and lewd behavior.
          </li>
          <li>
            Children under the age of sixteen (16) must be accompanied by an
            adult and remain within arms reach at all times. Dog parks for many
            reasons may not be a safe place for small children. The city is not
            responsible for any injury sustained to children while they are in
            the dog park.
          </li>
          <li>
            Richmond Animal Care and Control (RACC), Richmond Police Department
            (RPD), and Richmond City Parks and Recreation Department has the
            right to ask any and/or all park goers to leave at any time.
          </li>
          <li>
            Failure to comply with any of the above rules/regulations of the Dog
            Park, city code, and/or state law could result in you being banned
            from all City of Richmond Parks and Property.
          </li>
        </ul>
      </div>
    );
  }
}

export default Main;
