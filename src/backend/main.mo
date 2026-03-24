import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type ServiceCategory = {
    #aadhaar;
    #pan;
    #government;
    #digital;
  };

  type Service = {
    id : Nat;
    title : Text;
    description : Text;
    category : ServiceCategory;
    iconName : Text;
  };

  type Scheme = {
    id : Nat;
    name : Text;
    description : Text;
    eligibility : Text;
    documentsRequired : [Text];
    officialLink : Text;
    category : Text;
  };

  type News = {
    id : Nat;
    title : Text;
    content : Text;
    date : Int;
    category : Text;
  };

  type AppointmentStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  type Appointment = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    serviceId : Nat;
    preferredDate : Int;
    status : AppointmentStatus;
    createdAt : Int;
    bookedBy : Principal;
  };

  type UserRole = AccessControl.UserRole;

  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
  };

  module Service {
    public func compare(a : Service, b : Service) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Scheme {
    public func compare(a : Scheme, b : Scheme) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module News {
    public func compare(a : News, b : News) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Appointment {
    public func compare(a : Appointment, b : Appointment) : Order.Order {
      Int.compare(a.createdAt, b.createdAt);
    };
  };

  // Access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent storage
  let services = Map.empty<Nat, Service>();
  let schemes = Map.empty<Nat, Scheme>();
  let news = Map.empty<Nat, News>();
  let appointments = Map.empty<Nat, Appointment>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextServiceId = 1;
  var nextSchemeId = 1;
  var nextNewsId = 1;
  var nextAppointmentId = 1;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin functions
  public shared ({ caller }) func addService(service : Service) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextServiceId;
    let newService = {
      service with
      id;
    };
    services.add(id, newService);
    nextServiceId += 1;
    id;
  };

  public shared ({ caller }) func updateService(id : Nat, service : Service) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not services.containsKey(id)) { Runtime.trap("Service not found") };
    let updatedService = {
      service with
      id;
    };
    services.add(id, updatedService);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not services.containsKey(id)) { Runtime.trap("Service not found") };
    services.remove(id);
  };

  public shared ({ caller }) func addScheme(scheme : Scheme) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextSchemeId;
    let newScheme = {
      scheme with
      id;
    };
    schemes.add(id, newScheme);
    nextSchemeId += 1;
    id;
  };

  public shared ({ caller }) func updateScheme(id : Nat, scheme : Scheme) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not schemes.containsKey(id)) { Runtime.trap("Scheme not found") };
    let updatedScheme = {
      scheme with
      id;
    };
    schemes.add(id, updatedScheme);
  };

  public shared ({ caller }) func deleteScheme(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not schemes.containsKey(id)) { Runtime.trap("Scheme not found") };
    schemes.remove(id);
  };

  public shared ({ caller }) func addNews(newsItem : News) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextNewsId;
    let newNews = {
      newsItem with
      id;
    };
    news.add(id, newNews);
    nextNewsId += 1;
    id;
  };

  public shared ({ caller }) func updateNews(id : Nat, newsItem : News) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not news.containsKey(id)) { Runtime.trap("News item not found") };
    let updatedNews = {
      newsItem with
      id;
    };
    news.add(id, updatedNews);
  };

  public shared ({ caller }) func deleteNews(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not news.containsKey(id)) { Runtime.trap("News item not found") };
    news.remove(id);
  };

  public shared ({ caller }) func updateAppointmentStatus(id : Nat, status : AppointmentStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment = {
          appointment with
          status;
        };
        appointments.add(id, updatedAppointment);
      };
    };
  };

  // Public functions - accessible to everyone including guests
  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray().sort();
  };

  public query ({ caller }) func getAllSchemes() : async [Scheme] {
    schemes.values().toArray().sort();
  };

  public query ({ caller }) func getAllNews() : async [News] {
    news.values().toArray().sort();
  };

  public shared ({ caller }) func bookAppointment(appointment : Appointment) : async Int {
    let id = nextAppointmentId;
    let newAppointment = {
      appointment with
      id;
      status = #pending : AppointmentStatus;
      createdAt = Time.now();
      bookedBy = caller;
    };
    appointments.add(id, newAppointment);
    nextAppointmentId += 1;
    id;
  };

  public query ({ caller }) func getAppointment(id : Nat) : async Appointment {
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        // Only the person who booked or admin can view
        if (caller != appointment.bookedBy and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own appointments");
        };
        appointment;
      };
    };
  };

  // Admin-only function to view all appointments
  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };
    appointments.values().toArray().sort();
  };

  // Seed initial data (run once by admin)
  public shared ({ caller }) func seedInitialData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    // Add services
    ignore await addService({
      id = 0;
      title = "Aadhaar Card";
      description = "New Aadhaar enrollment, update, and correction";
      category = #aadhaar;
      iconName = "aadhaar";
    });

    ignore await addService({
      id = 0;
      title = "PAN Card";
      description = "New PAN card application and correction";
      category = #pan;
      iconName = "pan_card";
    });

    ignore await addService({
      id = 0;
      title = "ITR Filing";
      description = "Income Tax Return (ITR) filing assistance";
      category = #government;
      iconName = "itr_filing";
    });

    ignore await addService({
      id = 0;
      title = "Voter ID";
      description = "New Voter ID application and correction";
      category = #government;
      iconName = "voter_id";
    });

    ignore await addService({
      id = 0;
      title = "Passport";
      description = "Passport application and renewal services";
      category = #government;
      iconName = "passport";
    });

    ignore await addService({
      id = 0;
      title = "Ration Card";
      description = "Ration card application and renewal";
      category = #government;
      iconName = "ration_card";
    });

    ignore await addService({
      id = 0;
      title = "Income Certificate";
      description = "Income certificate application process";
      category = #government;
      iconName = "income_certificate";
    });

    ignore await addService({
      id = 0;
      title = "Caste Certificate";
      description = "Caste certificate application process";
      category = #government;
      iconName = "caste_certificate";
    });

    ignore await addService({
      id = 0;
      title = "Domicile Certificate";
      description = "Domicile certificate application process";
      category = #government;
      iconName = "domicile_certificate";
    });

    // Add schemes
    ignore await addScheme({
      id = 0;
      name = "PM Kisan";
      description = "Pradhan Mantri Kisan Samman Nidhi Yojana";
      eligibility = "Small and marginal farmers";
      documentsRequired = ["Aadhaar Card", "Bank Passbook", "Land Records"];
      officialLink = "https://pmkisan.gov.in/";
      category = "Farmer";
    });

    ignore await addScheme({
      id = 0;
      name = "PM Awas Yojana";
      description = "Affordable housing scheme for urban and rural poor";
      eligibility = "Economically weaker sections, low-income groups";
      documentsRequired = ["Aadhaar Card", "Income Certificate", "Property Documents"];
      officialLink = "https://pmaymis.gov.in/";
      category = "Housing";
    });

    ignore await addScheme({
      id = 0;
      name = "PMKVY";
      description = "Pradhan Mantri Kaushal Vikas Yojana - Skill development program";
      eligibility = "Unemployed youth, school/college dropouts";
      documentsRequired = ["Aadhaar Card", "Address Proof", "School/College Certificates"];
      officialLink = "https://pmkvyofficial.org/";
      category = "Skill Development";
    });

    ignore await addScheme({
      id = 0;
      name = "Ayushman Bharat";
      description = "Health insurance scheme for low-income families";
      eligibility = "Economically weaker sections";
      documentsRequired = ["Aadhaar Card", "Income Certificate"];
      officialLink = "https://pmjay.gov.in/";
      category = "Health";
    });

    ignore await addScheme({
      id = 0;
      name = "Ujjwala Yojana";
      description = "Free LPG connections for BPL families";
      eligibility = "Below poverty line families";
      documentsRequired = ["Aadhaar Card", "BPL Card"];
      officialLink = "https://pmuy.gov.in/";
      category = "Welfare";
    });

    ignore await addScheme({
      id = 0;
      name = "Sukanya Samriddhi Yojana";
      description = "Girl child savings scheme";
      eligibility = "Parents/guardians of girl child below 10 years";
      documentsRequired = ["Aadhaar Card", "Birth Certificate"];
      officialLink = "https://www.india.gov.in/sukanya-samriddhi-yojana";
      category = "Savings";
    });

    ignore await addScheme({
      id = 0;
      name = "Atal Pension Yojana";
      description = "Pension scheme for unorganized sector workers";
      eligibility = "Citizens aged 18-40 years";
      documentsRequired = ["Aadhaar Card", "Bank Account"];
      officialLink = "https://www.npscra.nsdl.co.in/scheme-details.php";
      category = "Pension";
    });
  };
};
