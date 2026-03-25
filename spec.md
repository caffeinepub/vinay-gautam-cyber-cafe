# Vinay Gautam Cyber Cafe — justdovinay.com

## Current State
App has DocumentApplyEarnSection.tsx with Voter ID, Passport, and Udyam cards (each with official links), but this component is NOT imported or rendered in App.tsx. Theme is dark/black with green primary.

## Requested Changes (Diff)

### Add
- Import and render DocumentApplyEarnSection in App.tsx (place it after GovtSchemesSection and before AadhaarPanSection)
- Ensure Udyam (udyamregistration.gov.in), Passport (passportindia.gov.in), Voter Card (voters.eci.gov.in) cards are prominently shown in DocumentApplyEarnSection with big, clear "Apply" buttons

### Modify
- Change the overall theme from dark/black to Indian flag colors:
  - Saffron/Orange (#FF9933) as primary accent
  - Deep Green (#138808) as secondary/success color
  - Navy Blue (#000080) as tertiary accent (Ashoka Chakra)
  - White/light backgrounds for main content areas
  - Update index.css CSS variables accordingly
  - Update SloganBanner to use saffron/green gradient (Indian flag stripe style)
  - ServicesAidBar background updated to saffron-tinted
  - Service cards updated to use flag-themed colors (saffron borders, green accents)

### Remove
- Nothing removed

## Implementation Plan
1. Update index.css: change CSS OKLCH variables to reflect Indian flag colors (saffron primary, green secondary, navy tertiary, light background)
2. Add DocumentApplyEarnSection import and usage in App.tsx
3. Update DocumentApplyEarnSection card styling to use Indian flag colors (saffron header/accent, green buttons, navy badge)
4. Update SloganBanner with saffron-to-green gradient flag stripe
5. Update ServicesAidBar background to saffron-tinted
6. Validate and build
