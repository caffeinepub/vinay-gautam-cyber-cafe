# justdovinay.com - Affiliate Marketing, Referral & Wallet System

## Current State
The site is a government services portal with:
- eSathi, government schemes, Aadhaar/PAN services
- Finance & Bank section
- PWA installability
- Appointment booking
- Admin page
- Authorization (role-based)

## Requested Changes (Diff)

### Add
- **Affiliate Marketing Section**: Display popular affiliate programs (Amazon, Flipkart, Meesho, Myntra, ShareASale, Hostinger, etc.) that anyone can join. Each card shows the program name, commission rate, and a "Join Now" button linking to the official affiliate signup page. The site owner (Vinay) earns commission when visitors sign up through these links.
- **Referral System**: Logged-in users get a unique referral code/link. When someone new signs up using that code, the referrer earns cashback credited to their wallet.
- **Wallet System**: Each user has a wallet showing their balance (from commissions/cashback). The owner (Vinay) can see total platform commission. Users can request withdrawal by providing bank account number + IFSC code.
- **Withdrawal Request Flow**: User submits account number + IFSC + amount → backend stores request → admin (Vinay) sees all pending withdrawal requests with account details → processes payment manually and marks as paid.
- **Commission Claim**: For affiliate commissions, company sends a message/notification. Owner (Vinay) can log the commission received from affiliates into his wallet. Admin panel gets a "Log Commission" feature.
- **Navbar link**: Add "Earn Money" link in navbar pointing to affiliate section.

### Modify
- Backend: Add wallet, referral code, withdrawal request data types and functions.
- Navbar: Add "Earn Money" nav link.
- App.tsx: Add Affiliate + Wallet sections.
- AdminPage.tsx: Add withdrawal requests view and commission logging.

### Remove
Nothing removed.

## Implementation Plan
1. Update Motoko backend with wallet balances, referral codes, withdrawal requests, commission logging.
2. Create AffiliateSection.tsx - grid of affiliate program cards with commission rates and join links.
3. Create ReferralWalletSection.tsx - shows user's referral link, wallet balance, withdrawal form.
4. Update AdminPage.tsx - add withdrawal requests list and "Log Commission Received" form.
5. Update Navbar.tsx - add "Earn Money" link.
6. Update App.tsx - include new sections.
