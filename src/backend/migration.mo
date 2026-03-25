import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
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

  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type Wallet = {
    balance : Nat;
    totalEarned : Nat;
    totalWithdrawn : Nat;
    referralCount : Nat;
  };

  type Referral = {
    code : Text;
    referrer : ?Principal;
    referrerReward : Nat;
    referredBy : ?Principal;
  };

  type WithdrawalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type WithdrawalRequest = {
    id : Nat;
    user : Principal;
    amount : Nat;
    bankAccountNumber : Text;
    ifscCode : Text;
    accountHolderName : Text;
    status : WithdrawalStatus;
    createdAt : Int;
    processedAt : ?Int;
  };

  type CommissionLog = {
    id : Nat;
    amount : Nat;
    source : Text;
    date : Int;
    description : Text;
  };

  type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
  };

  type OldActor = {
    services : Map.Map<Nat, Service>;
    schemes : Map.Map<Nat, Scheme>;
    news : Map.Map<Nat, News>;
    appointments : Map.Map<Nat, Appointment>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextServiceId : Nat;
    nextSchemeId : Nat;
    nextNewsId : Nat;
    nextAppointmentId : Nat;
  };

  type NewActor = {
    services : Map.Map<Nat, Service>;
    schemes : Map.Map<Nat, Scheme>;
    news : Map.Map<Nat, News>;
    appointments : Map.Map<Nat, Appointment>;
    userProfiles : Map.Map<Principal, UserProfile>;

    wallets : Map.Map<Principal, Wallet>;
    referrals : Map.Map<Principal, Referral>;
    withdrawalRequests : Map.Map<Nat, WithdrawalRequest>;
    commissionLogs : Map.Map<Nat, CommissionLog>;

    nextServiceId : Nat;
    nextSchemeId : Nat;
    nextNewsId : Nat;
    nextAppointmentId : Nat;
    nextWithdrawalRequestId : Nat;
    nextCommissionLogId : Nat;

    referralRewardAmount : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      wallets = Map.empty<Principal, Wallet>();
      referrals = Map.empty<Principal, Referral>();
      withdrawalRequests = Map.empty<Nat, WithdrawalRequest>();
      commissionLogs = Map.empty<Nat, CommissionLog>();
      nextWithdrawalRequestId = 1;
      nextCommissionLogId = 1;
      referralRewardAmount = 5000;
    };
  };
};
