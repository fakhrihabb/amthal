# SIVANA Hackathon MVP - Development Task Assignment

**Project:** SIVANA (System Intelligence EV for Location Analytics)  
**Timeline:** Hackathon Duration  
**Team Size:** 3 Developers  
**Tech Stack:** Next.js, Supabase, Google Cloud APIs (Maps, Places, Distance Matrix, Gemini)

---

## Team Structure & Responsibilities

### Developer 1: Frontend & Landing Page Lead
**Focus:** Landing page, navigation, Google Maps integration, 2D/3D views, interactive map features

### Developer 2: Analysis Engine & AI Lead  
**Focus:** Location analysis logic, scoring algorithms, Gemini API integration, mock data generation

### Developer 3: Projects & Reports Lead
**Focus:** Project management features, database operations, report generation, data persistence

**Note:** No authentication or RBAC implementation needed - open access for hackathon MVP

---

## Developer 1: Frontend & Landing Page Lead

### Primary Responsibilities
Build the landing page, navigation system, and entire Intelligence Planner map interface with all map-related visualization features.

### Tasks

#### Task 1.1: Landing Page & Navigation Setup
**Estimated Time:** 3-4 hours

**Deliverables:**
- Initialize Next.js project with TypeScript
- Install and configure required dependencies:
  - `@googlemaps/js-api-loader`
  - `@react-google-maps/api` (or similar)
  - Tailwind CSS
  - Any map-related utilities
- Set up environment variables for Google Maps API key
- Create landing page (`/`) with:
  - Hero section with SIVANA branding and tagline
  - Brief explanation (2-3 sentences in Bahasa Indonesia)
  - Key benefits/features (3-4 bullet points)
  - "Coba Demo" (Try Demo) button as primary CTA
  - Clean, minimal design
  - Simple footer with basic info
- Create navigation header component:
  - Logo/branding
  - Links to Intelligence Planner and Projects pages
  - Consistent across all pages
- Set up routing:
  - `/` - Landing page
  - `/intelligence-planner` - Map view
  - `/projects` - Projects list
  - `/projects/:id` - Project details

**Acceptance Criteria:**
- Landing page loads with clean, professional design
- "Coba Demo" button navigates to Intelligence Planner
- Navigation header works consistently across pages
- Responsive layout works on desktop and tablet
- All text in Bahasa Indonesia

---

#### Task 1.2: Base Map Implementation
**Estimated Time:** 3-4 hours

**Deliverables:**
- Implement basic 2D Google Map component on Intelligence Planner page
  - Default center: DKI Jakarta province (-6.2088, 106.8456)
  - Appropriate zoom level to show full province
  - Standard map controls (zoom, pan)
  - Street map and satellite view toggle
- Create map layout:
  - Left sidebar for controls (collapsible)
  - Center map takes 70-75% of width
  - Right sidebar for analysis results (collapsible)
- Add basic UI polish:
  - Loading states
  - Smooth transitions
  - Clean, minimal interface in Bahasa Indonesia

**Acceptance Criteria:**
- Map loads successfully centered on DKI Jakarta
- User can pan and zoom smoothly
- Map view toggles between street and satellite
- Layout is responsive and functional
- Performance is smooth (60fps interactions)

---

#### Task 1.3: Map Markers & Layers System
**Estimated Time:** 4-5 hours

**Deliverables:**
- Create marker system for displaying:
  - Existing SPKLU stations (custom icon/color)
  - Existing SPBKLU stations (different icon/color)
  - Candidate locations (distinct marker)
- Implement click-to-add candidate location functionality
  - User clicks map → adds candidate marker
  - Show coordinates tooltip on hover
  - Allow marker deletion/editing
- Build layer toggle UI component (sidebar or overlay)
  - Checkbox controls for each layer
  - Opacity slider for layers
  - Clean, minimal UI

**Acceptance Criteria:**
- Users can see existing stations clearly distinguished by type
- Clicking map adds a new candidate marker
- Candidate markers can be removed
- Layer toggles work smoothly without performance issues
- Maximum 1000 markers can be displayed without lag

---

#### Task 1.4: 3D View Implementation
**Estimated Time:** 3-4 hours

**Deliverables:**
- Implement Google Maps 3D/tilt mode
  - Toggle button to switch between 2D and 3D
  - Smooth transition animation
  - Set appropriate tilt angle (45-60 degrees)
- Add 3D navigation controls:
  - Rotation (compass controls)
  - Tilt adjustment
  - Zoom in 3D space
- Ensure markers remain visible and clickable in 3D mode
- Add screenshot capture button for 3D view
  - Captures current map view as image
  - Downloads or stores for later use

**Acceptance Criteria:**
- 3D view loads with photorealistic buildings (in supported areas)
- Smooth transition between 2D and 3D modes
- All markers remain functional in 3D view
- Users can rotate and explore the 3D environment easily
- Screenshot function works and produces usable images

---

#### Task 1.5: Google Places API Integration (POI Layer)
**Estimated Time:** 4-5 hours

**Deliverables:**
- Integrate Google Places API for POI data layer
- Implement POI search functionality:
  - Search for specific POI types (malls, universities, parking, rest areas, transit stations)
  - Display results as markers on map
  - Custom icons for different POI categories
- Create POI info window/popup:
  - Show POI name, type, address
  - Display rating if available
  - Show distance from selected candidate location
- Build POI filter controls:
  - Checkboxes for POI categories
  - Radius selector (500m, 1km, 2km, 5km from candidate)
  - Show/hide POI markers based on filters

**Acceptance Criteria:**
- POI markers appear when layer is enabled
- Different POI types have distinct visual markers
- Clicking POI shows relevant information
- Filter controls work smoothly
- POI data refreshes when user changes map area (if needed)
- No more than 100 POI markers shown at once to maintain performance

---

#### Task 1.6: Map Search & Location Selection
**Estimated Time:** 3-4 hours

**Deliverables:**
- Implement Google Geocoding API for address search
  - Search bar in map interface
  - Autocomplete suggestions as user types
  - Search by address, place name, or coordinates
  - Map centers on selected location
- Create location selection panel:
  - Shows coordinates of clicked location
  - Display address (reverse geocoding)
  - "Analyze This Location" button
  - Quick copy coordinates feature
- Implement candidate location list (sidebar):
  - Shows all added candidate markers
  - Click to center map on location
  - Remove button for each location
  - Shows basic info (address, coordinates)

**Acceptance Criteria:**
- Search works accurately for Indonesian locations
- Autocomplete provides relevant suggestions
- Clicking map shows accurate coordinates and address
- Candidate list updates in real-time as markers are added/removed
- Users can navigate to any candidate location from the list

---

#### Task 1.7: Integration Points for Analysis Results
**Estimated Time:** 2-3 hours

**Deliverables:**
- Create analysis results panel (right sidebar, collapsible)
  - Placeholder for scores display
  - Placeholder for AI insights
  - Placeholder for recommendation
- Implement event emitter/callback system:
  - When user clicks "Analyze" → emit event with location data
  - When analysis completes → receive and display results
  - Loading state while analysis runs
- Create save to project button and modal:
  - "Simpan ke Proyek Baru" (Save to New Project) button
  - "Tambah ke Proyek yang Ada" (Add to Existing Project) button
  - Simple modal for project name input in Bahasa Indonesia
  - Emit save event with location + analysis data

**Acceptance Criteria:**
- Results panel displays mock data correctly
- Loading states show appropriately
- Save buttons trigger correct events
- Panel is responsive and works on different screen sizes
- Integration with Developer 2's analysis system works via simple JSON data exchange
- All UI text in Bahasa Indonesia

---

### Developer 1 Summary
**Total Estimated Time:** 22-28 hours  
**Key Deliverables:** Landing page with navigation, complete Intelligence Planner page with functional 2D/3D maps, markers, POI integration, and search functionality  
**Dependencies:** Minimal - only needs analysis result format from Developer 2 for display purposes

---

## Developer 2: Analysis Engine & AI Lead

### Primary Responsibilities
Build all location analysis logic, scoring algorithms, and AI-powered insights using Gemini API.

### Tasks

#### Task 2.1: Database Schema & Supabase Setup
**Estimated Time:** 2-3 hours

**Deliverables:**
- Set up Supabase project and get connection credentials
- Design and create database schema:
  - `projects` table (id, name, description, created_at, updated_at)
    - No user_id or status fields - keeping simple for MVP
  - `locations` table (id, project_id, name, latitude, longitude, address, created_at)
  - `analyses` table (id, location_id, demand_score, grid_score, accessibility_score, competition_score, overall_score, insights_text, recommendation, financial_data_json, created_at)
  - `existing_stations` table (id, name, type [SPKLU/SPBKLU], latitude, longitude, capacity, operator)
- Enable PostGIS extension in Supabase for spatial queries
- Create indexes for performance:
  - Spatial index on location coordinates
  - Index on project_id
- Seed database with realistic mock data:
  - **Major Cities & Metropolitan Areas** (Dense coverage - every 2-5km):
    - DKI Jakarta: 20-25 stations
    - Surabaya: 10-12 stations
    - Bandung: 8-10 stations
    - Medan: 6-8 stations
    - Semarang: 5-7 stations
  - **Suburban Areas** (Moderate coverage - every 5-10km):
    - Around major cities: 15-20 stations
  - **Non-Metropolitan** (Sparse coverage - every 10-20km):
    - Rest of Indonesia: 10-15 stations
  - **Total: ~80-100 mock stations**
  - Mix of SPKLU (60%) and SPBKLU (40%)
  - Sample grid capacity data (can be simple JSON in a config table)

**Acceptance Criteria:**
- Database schema created and documented
- PostGIS extension enabled and working
- Realistic mock station data loaded with appropriate density distribution
- Connection from Next.js API routes verified
- Spatial queries tested (e.g., find stations within 5km of a point)

---

#### Task 2.2: Analysis Engine Core - Scoring Algorithms
**Estimated Time:** 5-6 hours

**Deliverables:**
- Create Next.js API route: `/api/analyze-location`
  - Accepts: `{ latitude, longitude, address? }`
  - Returns: complete analysis object with all scores
- Implement Demand Score calculation (0-100):
  - Use Google Places API to count nearby POIs (different weights for types)
  - High-traffic POIs (malls, universities, transit): +20 points each
  - Medium-traffic (restaurants, offices): +10 points each
  - Scale to 0-100 based on total weighted points
  - Consider 2km radius for calculation
- Implement Grid Readiness Score (0-100):
  - Query mock grid capacity data from database
  - Find nearest substation using PostGIS
  - Score based on distance: <1km = 90-100, <3km = 70-90, <5km = 50-70, >5km = <50
  - Factor in available capacity (from mock data)
- Implement Accessibility Score (0-100):
  - Use Google Distance Matrix API to calculate travel time from nearby major roads/highways
  - Check for parking facilities within 200m using Places API
  - Score: <5min from highway + parking = 90-100, <10min + parking = 70-90, etc.
  - Consider road type (highway access = higher score)
- Implement Competition Score (0-100):
  - Query existing stations from database using PostGIS spatial query
  - Find all SPKLU/SPBKLU within 5km radius
  - Score: 0 stations = 100, 1 station = 80, 2 stations = 60, 3+ stations = 40 or less
  - Weight by distance (closer stations reduce score more)
- Calculate Overall Suitability Score (0-100):
  - Weighted average: Demand (30%), Grid (25%), Accessibility (25%), Competition (20%)
  - Round to whole number

**Acceptance Criteria:**
- API endpoint responds within 5 seconds
- All scores are calculated correctly based on defined logic
- Scores are reproducible (same input = same output)
- Edge cases handled (e.g., no nearby POIs, remote locations)
- API returns properly formatted JSON
- Google API rate limits considered (implement caching if needed)

---

#### Task 2.3: Infrastructure Recommendation Logic
**Estimated Time:** 2-3 hours

**Deliverables:**
- Create recommendation engine function
- Implement logic to recommend SPKLU, SPBKLU, or Hybrid based on:
  - Demand score > 70 + Accessibility > 60 → SPKLU (fast charging for high traffic)
  - Demand score 40-70 + Competition low → SPBKLU (battery swap for moderate traffic)
  - Demand score > 80 + large commercial area nearby → Hybrid (both)
  - Default to SPKLU if unclear
- Generate technical specifications:
  - SPKLU: number of chargers (1-4 based on demand), power requirement (50-350 kW)
  - SPBKLU: number of swap stations (1-2), estimated battery inventory
  - Space requirement estimate (50-200 sq meters)
- Generate financial estimates:
  - Capital investment: SPKLU 500M-2B IDR, SPBKLU 1-3B IDR (scaled by size)
  - Monthly operational cost: 10-30M IDR
  - Revenue projection: based on utilization % (demand score proxy) × average transaction value
  - Simple payback period: investment / (revenue - opex) / 12 months

**Acceptance Criteria:**
- Recommendation logic produces sensible results for different scenarios
- Technical specs align with recommendation type
- Financial estimates are reasonable and documented
- All calculations included in API response

---

#### Task 2.4: Gemini API Integration for AI Insights
**Estimated Time:** 4-5 hours

**Deliverables:**
- Set up Google Cloud Gemini API access and credentials
- Create Next.js API route: `/api/generate-insights`
  - Accepts: analysis data (scores, nearby POIs, distances, recommendation)
  - Returns: natural language insights text
- Build prompt template for Gemini:
  - "Given this location analysis data: [JSON]"
  - "Generate a concise 150-200 word explanation covering:"
  - "1. Why this location scored as it did (mention specific strengths)"
  - "2. Primary risks or concerns"
  - "3. How it compares to the area average"
  - "4. Specific recommendations"
- Implement insight generation:
  - Send formatted prompt to Gemini API
  - Parse response
  - Handle errors gracefully (fallback to template-based insights if API fails)
  - Cache insights to avoid redundant API calls
- Create fallback template system:
  - If Gemini unavailable, generate basic insights from templates
  - Use score thresholds to pick appropriate templates

**Acceptance Criteria:**
- Gemini API integration works and returns coherent insights
- Insights are relevant to the location's actual scores and context
- Response time is reasonable (<3 seconds)
- Fallback system works when API is unavailable
- Insights text is properly formatted and readable
- No hallucination about non-existent features or data

---

#### Task 2.5: Combined Analysis Endpoint
**Estimated Time:** 2-3 hours

**Deliverables:**
- Create master API route: `/api/analyze-location-complete`
  - Combines scoring and AI insights in one call
  - Accepts: `{ latitude, longitude, address? }`
  - Returns: complete analysis object:
    ```json
    {
      "location": { "lat", "lng", "address" },
      "scores": {
        "demand": 85,
        "grid": 75,
        "accessibility": 90,
        "competition": 60,
        "overall": 78
      },
      "recommendation": {
        "type": "SPKLU",
        "rationale": "...",
        "technical_specs": {...},
        "financial_estimates": {...}
      },
      "insights": "AI-generated text...",
      "analyzed_at": "timestamp"
    }
    ```
- Save analysis to database:
  - Store in `analyses` table
  - Link to location (if it's a saved candidate)
  - Enable retrieval of historical analyses
- Implement analysis history endpoint:
  - `/api/analyses/:locationId` - get all analyses for a location
  - Useful for tracking how scores change over time

**Acceptance Criteria:**
- Single endpoint provides complete analysis results
- Response time under 8 seconds total
- Analysis saved to database successfully
- Error handling for all potential failures (Google API issues, database errors)
- Response format matches specification for Developer 1's display needs

---

#### Task 2.6: Data Export & Analysis Utilities
**Estimated Time:** 2-3 hours

**Deliverables:**
- Create API endpoint: `/api/export-analysis`
  - Accepts: location or project ID
  - Returns: formatted JSON suitable for report generation
  - Include all scores, insights, recommendations
- Build comparison utility function:
  - Compare multiple locations side-by-side
  - Calculate relative rankings
  - Highlight best/worst in each category
- Create mock data generator for testing:
  - Generate realistic analysis results for testing
  - Populate database with sample analyses
  - Useful for Developer 3's report testing

**Acceptance Criteria:**
- Export endpoint returns complete, well-formatted data
- Comparison logic works for 2-10 locations
- Mock data is realistic and useful for testing
- Documentation of data formats provided

---

### Developer 2 Summary
**Total Estimated Time:** 17-23 hours  
**Key Deliverables:** Complete analysis engine with scoring algorithms, Gemini AI integration, database schema with realistic mock data, and API endpoints  
**Dependencies:** Needs Google API keys (Maps, Places, Distance Matrix, Gemini) - can work with mock data initially if APIs not ready

---

## Developer 3: Projects & Reports Lead

### Primary Responsibilities
Build the Projects page, project management features, database operations, report generation system, and local storage for projects.

### Tasks

#### Task 3.1: Projects Page - List & Create
**Estimated Time:** 4-5 hours

**Deliverables:**
- Create Projects page UI (`/projects`):
  - Project list view (card or table layout in Bahasa Indonesia)
  - Each card shows: project name, created date, location count
  - Empty state when no projects exist ("Belum ada proyek")
  - Responsive grid layout
- Implement "Create New Project" functionality:
  - Modal or dedicated form
  - Fields: project name (required), description (optional), objective/goals (optional)
  - All labels and text in Bahasa Indonesia
- Build project list features:
  - Search projects by name
  - Sort by date created or modified
  - Pagination (if > 20 projects)
- Implement local storage + Supabase hybrid:
  - Save projects to localStorage for instant access
  - Optionally sync to Supabase for persistence
  - Handle offline gracefully
- Create API endpoints:
  - `POST /api/projects` - Create new project
  - `GET /api/projects` - List all projects
  - `GET /api/projects/:id` - Get single project details

**Acceptance Criteria:**
- Users can create new projects with name and description
- Projects list displays all projects
- Search works correctly
- UI is clean, responsive, and in Bahasa Indonesia
- Projects persist in localStorage
- Projects optionally save to Supabase database

---

#### Task 3.2: Project Details Page
**Estimated Time:** 5-6 hours

**Deliverables:**
- Create Project Details page (`/projects/:id`):
  - Header section: project name, description, status, dates
  - Edit project info button (name, description, status)
  - Delete project button (with confirmation)
- Build Locations section:
  - List all locations/candidates in this project
  - Show each location's:
    - Address and coordinates
    - Overall suitability score (with visual indicator)
    - Thumbnail map image (if available)
    - Analysis date
  - Click location to see full analysis details
  - Remove location from project button
- Display summary statistics:
  - Total number of locations
  - Average suitability score
  - Total estimated investment (sum of all locations)
  - Mix of SPKLU vs SPBKLU recommendations
- Create API endpoints:
  - `PUT /api/projects/:id` - Update project info
  - `DELETE /api/projects/:id` - Delete project
  - `GET /api/projects/:id/locations` - Get all locations in project
  - `POST /api/projects/:id/locations` - Add location to project
  - `DELETE /api/projects/:id/locations/:locationId` - Remove location from project

**Acceptance Criteria:**
- Project details page displays all relevant information
- Users can edit project metadata
- Locations list shows all added candidates
- Summary statistics calculate correctly
- Add/remove locations works smoothly

---

#### Task 3.2: Project Details Page
**Estimated Time:** 5-6 hours

**Deliverables:**
- Create Project Details page (`/projects/:id`) in Bahasa Indonesia:
  - Header section: project name, description, dates
  - Edit project info button ("Ubah Info Proyek")
  - Delete project button with confirmation ("Hapus Proyek")
- Build Locations section:
  - List all locations/candidates in this project
  - Show each location's:
    - Address and coordinates
    - Overall suitability score (with visual indicator/badge)
    - Thumbnail map image (if available)
    - Analysis date
  - Click location to see full analysis details
  - Remove location from project button ("Hapus Lokasi")
- Display summary statistics:
  - Total number of locations ("Total Lokasi")
  - Average suitability score ("Skor Rata-rata")
  - Total estimated investment ("Total Investasi")
  - Mix of SPKLU vs SPBKLU recommendations
- Create API endpoints:
  - `PUT /api/projects/:id` - Update project info
  - `DELETE /api/projects/:id` - Delete project
  - `GET /api/projects/:id/locations` - Get all locations in project
  - `POST /api/projects/:id/locations` - Add location to project
  - `DELETE /api/projects/:id/locations/:locationId` - Remove location from project

**Acceptance Criteria:**
- Project details page displays all relevant information
- Users can edit project metadata
- Locations list shows all added candidates
- Summary statistics calculate correctly
- Add/remove locations works smoothly
- All UI text in Bahasa Indonesia

---

#### Task 3.3: Location Comparison View
**Estimated Time:** 3-4 hours

**Deliverables:**
- Create comparison interface within project details:
  - Side-by-side comparison table for multiple locations
  - Column headers in Bahasa Indonesia: Lokasi, Skor Total, Permintaan, Grid, Aksesibilitas, Kompetisi, Investasi
  - Visual indicators (color coding for scores: hijau/green = high, kuning/yellow = medium, merah/red = low)
  - Sort by any column
  - Mark location as "Direkomendasikan" (Recommended) or "Ditolak" (Rejected) with simple badge/tag
- Build comparison chart visualization:
  - Bar chart comparing overall scores of all locations
  - Radar chart showing multi-dimensional comparison (all 4 sub-scores)
  - Chart labels in Bahasa Indonesia
  - Use Chart.js or Recharts
- Add simple decision notes:
  - Notes field for each location ("Catatan")
  - Save notes to database/localStorage
- Create API endpoints:
  - `PUT /api/locations/:id/notes` - Update location notes

**Acceptance Criteria:**
- Comparison table clearly shows all locations side-by-side
- Charts render correctly and are readable
- Users can mark locations and add notes
- Visual comparison helps identify best options quickly
- All updates save properly
- All text in Bahasa Indonesia

---

#### Task 3.4: Report Generation System
**Estimated Time:** 5-6 hours

**Deliverables:**
- Create report generation API endpoint:
  - `POST /api/projects/:id/generate-report`
  - Accepts: project ID
  - Returns: PDF file URL in Google Cloud Storage
- Build PDF generation logic (in Bahasa Indonesia):
  - Use library like `jsPDF`, `pdfkit`, or `puppeteer`
  - Report structure:
    1. Cover page (project name, date, SIVANA logo/branding)
    2. Ringkasan Eksekutif (Executive summary - objective, recommendation)
    3. Metodologi (brief description of analysis approach)
    4. Analisis Lokasi section (for each location):
       - Map snapshot (use Google Static Maps API)
       - Address and coordinates
       - Scores table with Bahasa labels
       - AI insights text
       - Recommendation and technical specs
       - Financial projections (in IDR)
    5. Perbandingan (Comparison section if multiple locations):
       - Comparison table
       - Chart images
    6. Lampiran (Appendix - detailed data)
  - Use platform's logo and branding throughout
- Integrate Google Cloud Storage:
  - Upload generated PDF to Cloud Storage bucket
  - Generate signed URL for download (24-hour expiry)
  - Store reference in database
- Create report download UI:
  - "Buat Laporan" (Generate Report) button on project details page
  - Loading state while generating
  - "Unduh Laporan" (Download Report) link when ready
  - Option to regenerate if data changed

**Acceptance Criteria:**
- PDF generates successfully with all required sections in Bahasa Indonesia
- Report is professional-looking with SIVANA branding
- Map images and charts appear correctly in PDF
- PDFs stored in Cloud Storage and accessible via signed URL
- Report generation completes within 30 seconds
- Currency displayed in IDR format

---

#### Task 3.5: Save Location from Intelligence Planner
**Estimated Time:** 3-4 hours

**Deliverables:**
- Create API endpoint to save analyzed location:
  - `POST /api/save-location`
  - Accepts: location data, analysis results, project info (new or existing)
  - If new project: creates project first, then adds location
  - If existing project: adds location to existing project
  - Returns: project ID and location ID
  - Saves to both localStorage and Supabase
- Build "Simpan ke Proyek" (Save to Project) modal component:
  - Reusable component called from Intelligence Planner (Developer 1's code)
  - Options in Bahasa Indonesia:
    - "Buat Proyek Baru" (Create new project) - name input field
    - "Tambah ke Proyek yang Ada" (Add to existing project) - dropdown of projects
  - Optional: location nickname field ("Nama Lokasi")
  - "Simpan" (Save) button triggers API call
- Implement success flow:
  - Show success message: "Lokasi berhasil disimpan!"
  - Option to "Lihat Proyek" (Go to Project) or "Lanjut Analisis" (Continue Analyzing)
  - Clear candidate marker after saving (or keep based on UX decision)
- Handle edge cases:
  - Prevent duplicate saves of same location to same project
  - Validate project name if creating new
  - Handle network errors gracefully with Bahasa error messages

**Acceptance Criteria:**
- Users can save analyzed locations to new or existing projects
- Modal UI is clean and intuitive with Bahasa Indonesia labels
- Save operation completes successfully
- Location appears in project details immediately after save
- Works offline with localStorage, syncs when online
- Error messages are clear and helpful in Bahasa

---

#### Task 3.6: Project History & Notes System
**Estimated Time:** 2-3 hours

**Deliverables:**
- Create simple history/activity log:
  - `project_history` table (id, project_id, action_type, description, created_at)
  - Log key events: project created, location added/removed, report generated
  - Simple implementation - no complex tracking
- Build history timeline UI in project details:
  - Chronological list of activities with Bahasa labels
  - Show action and timestamp
  - Collapsible section if many events
- Implement basic notes system:
  - `project_notes` table (id, project_id, note_text, created_at)
  - "Tambah Catatan" (Add note) button on project details page
  - Display notes in timeline or separate section
  - Simple text notes only
- Create API endpoints:
  - `GET /api/projects/:id/history` - Get project activity log
  - `POST /api/projects/:id/notes` - Add note

**Acceptance Criteria:**
- History automatically logs key project events
- Users can add simple text notes to projects
- Timeline displays in chronological order in Bahasa Indonesia
- Notes persist and are retrievable
- Useful for tracking basic decisions

---

### Developer 3 Summary
**Total Estimated Time:** 21-28 hours  
**Key Deliverables:** Complete Projects page, project management features, report generation in Bahasa Indonesia with SIVANA branding, localStorage + Supabase hybrid storage, and integration with Intelligence Planner  
**Dependencies:** Needs analysis data format from Developer 2; provides save endpoint for Developer 1 to call

**Note:** No authentication/RBAC implementation needed - simplified for hackathon MVP

---

## Integration Points & Handoffs

### Critical Integration Points

#### Integration A: Map → Analysis
**Between:** Developer 1 and Developer 2  
**What:** When user clicks "Analyze Location" on map, send location data to analysis API

**Developer 1 provides:**
```
Location object: {
  latitude: number,
  longitude: number,
  address: string (from reverse geocoding)
}
```

**Developer 2 returns:**
```
Analysis object: {
  location: { lat, lng, address },
  scores: { demand, grid, accessibility, competition, overall },
  recommendation: { type, rationale, technical_specs, financial_estimates },
  insights: "AI text...",
  analyzed_at: "timestamp"
}
```

**Handoff Method:** Developer 2 creates API endpoint first, documents request/response format. Developer 1 implements calling code using documented format. Test with mock data initially.

---

#### Integration B: Map → Save to Project
**Between:** Developer 1 and Developer 3  
**What:** When user clicks "Save to Project" from map, save location and analysis to database

**Developer 1 provides:**
```
Save request: {
  location: { latitude, longitude, address },
  analysis: { (complete analysis object from Integration A) },
  project: {
    isNew: boolean,
    projectId?: string (if existing),
    projectName?: string (if new),
    projectDescription?: string (if new)
  },
  locationNickname?: string
}
```

**Developer 3 returns:**
```
{
  success: boolean,
  projectId: string,
  locationId: string,
  message: string
}
```

**Handoff Method:** Developer 3 creates save endpoint first, documents format. Developer 1 implements save modal and API call. Can test with mock projects initially.

---

#### Integration C: Projects → Analysis Data
**Between:** Developer 3 and Developer 2  
**What:** Projects page needs to retrieve saved analysis data for display and reports

**Developer 3 queries:**
- Uses Developer 2's database schema (analyses table)
- Retrieves analysis records via location_id foreign key
- No API call needed (direct database access via Supabase client)

**Handoff Method:** Developer 2 documents database schema clearly. Developer 3 uses schema to query data. Both developers coordinate on schema changes.

---

#### Integration D: Report Generation → Analysis Data
**Between:** Developer 3 and Developer 2  
**What:** Report generation needs complete analysis data including insights

**Developer 3 uses:**
- Analysis data from database (Developer 2's schema)
- May call `/api/export-analysis` endpoint if Developer 2 creates it
- Formats data into PDF

**Handoff Method:** Developer 2 provides export endpoint or clear documentation of data structure. Developer 3 implements report templates based on available data.

---

## Dependency Matrix

| Task | Depends On | Type | Blocking? | Mitigation |
|------|-----------|------|-----------|------------|
| Dev 1 - Task 1.7 (Integration) | Dev 2 - Task 2.5 (Analysis API) | Data Format | Partial | Use mock API response format initially |
| Dev 1 - Task 1.7 (Save) | Dev 3 - Task 3.5 (Save endpoint) | API Endpoint | Partial | Dev 3 creates endpoint first; Dev 1 can build UI with mock |
| Dev 3 - Task 3.2 (Project Details) | Dev 2 - Task 2.1 (Database Schema) | Schema | Yes | Dev 2 must complete schema first (high priority) |
| Dev 3 - Task 3.4 (Report Generation) | Dev 2 - Task 2.5 (Analysis data) | Data Format | Partial | Can use mock data for template development |
| Dev 2 - Task 2.2 (Scoring) | External APIs (Google) | API Keys | Yes | Obtain API keys before starting; use mock data if delayed |

### Dependency Resolution Strategy

1. **Day 1 Priority:**
   - Dev 2: Complete Task 2.1 (Database Schema) immediately - BLOCKS Dev 3
   - Dev 1: Complete Task 1.1 (Landing Page & Navigation) - independent
   - Dev 3: Can start Task 3.1 (Projects List) with localStorage - independent

2. **Early Documentation:**
   - Dev 2: Document API response formats for Tasks 2.5 early (by end of Day 1)
   - Dev 3: Document save endpoint format for Task 3.5 early (by end of Day 1)
   - Share API formats in shared doc/Slack before implementation

3. **Mock Data Strategy:**
   - All developers create mock data generators for their domains
   - Dev 1 mocks analysis responses
   - Dev 2 creates realistic station density mock data (~80-100 stations)
   - Dev 3 mocks projects (can use localStorage initially)
   - Continue development in parallel

4. **Integration Testing:**
   - Schedule integration testing sessions:
     - After Day 2: Test Map → Analysis flow
     - After Day 3: Test Map → Save to Project flow
     - After Day 4: Test Project → Report generation
   - Fix integration issues together

---

## Testing Responsibilities

### Developer 1
- Landing page loads and navigates correctly
- Map loads and performs smoothly centered on DKI Jakarta
- All markers display correctly
- 3D view works in supported areas
- Search and geocoding accurate
- UI responsive on different screen sizes
- All UI text in Bahasa Indonesia

### Developer 2
- Analysis API returns correct scores
- Gemini API integration works and generates Bahasa insights
- Database queries execute efficiently (<2 seconds)
- Edge cases handled (no data, API failures)
- Mock station data has realistic density distribution (~80-100 stations)

### Developer 3
- Projects CRUD operations work
- Report PDFs generate correctly with Bahasa Indonesia content
- localStorage + Supabase hybrid storage works
- Save operations persist data
- SIVANA branding appears correctly in reports

### Integration Testing (All Developers)
- Full flow: landing page → demo → search location → analyze → save → view in project → generate report
- Error handling across system boundaries
- Performance testing (is analysis + save under 10 seconds?)
- All text appears in Bahasa Indonesia throughout the app

---

## Communication & Coordination

### Daily Standups (15 minutes)
- What did you complete yesterday?
- What are you working on today?
- Any blockers or dependencies?

### Shared Documentation
Create a shared document (Google Doc or Notion) with:
- API endpoint documentation (request/response formats)
- Database schema reference
- Mock data examples
- Known issues and workarounds
- Environment variables needed

### Code Repository
- Use feature branches
- Merge to `main` frequently (daily if possible)
- Coordinate on .env variables
- Share Supabase and Google Cloud credentials securely

### API Format Agreement (Critical)
Before Day 2, all developers agree on:
1. Analysis API response format (Integration A)
2. Save location request format (Integration B)
3. Database schema (all tables, columns, types)

---

## Timeline Suggestion

### Day 1 (8 hours)
- **Dev 1:** Tasks 1.1, 1.2 (landing page + base map)
- **Dev 2:** Task 2.1 (database + mock data generation) - PRIORITY
- **Dev 3:** Task 3.1 (projects list with localStorage)
- **All:** API format documentation, environment setup

### Day 2 (8 hours)
- **Dev 1:** Tasks 1.3, 1.4 (markers + 3D view)
- **Dev 2:** Tasks 2.2, 2.3 (scoring + recommendations)
- **Dev 3:** Tasks 3.2 (project details)
- **Integration Test 1:** Map → Analysis

### Day 3 (8 hours)
- **Dev 1:** Tasks 1.5, 1.6 (POI layer + search)
- **Dev 2:** Tasks 2.4, 2.5 (Gemini + complete API)
- **Dev 3:** Task 3.3, 3.4 (comparison + report generation start)
- **Integration Test 2:** Map → Save to Project

### Day 4 (6-8 hours)
- **Dev 1:** Task 1.7 (integration points) + Polish UI
- **Dev 2:** Task 2.6 (utilities) + Performance optimization
- **Dev 3:** Tasks 3.5, 3.6 (save endpoint + history/notes)
- **Integration Test 3:** Full flow end-to-end

### Day 5 (Buffer/Polish)
- All: Bug fixes, Bahasa Indonesia text review, performance tuning
- Final integration testing
- Report generation testing
- Demo preparation and practice run

---

## Environment Setup Checklist

### All Developers Need:
- [ ] Node.js 18+ installed
- [ ] Git configured
- [ ] Code editor (VS Code recommended)
- [ ] Access to shared repository
- [ ] Supabase project credentials
- [ ] Google Cloud Platform project access
- [ ] Google Maps API key
- [ ] Google Places API key
- [ ] Google Distance Matrix API key
- [ ] Google Gemini API key
- [ ] Google Cloud Storage bucket name

### Shared .env Template:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GOOGLE_PLACES_API_KEY=
GOOGLE_DISTANCE_MATRIX_API_KEY=
GOOGLE_GEMINI_API_KEY=

GOOGLE_CLOUD_STORAGE_BUCKET=
GOOGLE_CLOUD_PROJECT_ID=

NODE_ENV=development
```

**Note:** No authentication keys needed - open access for MVP

---

## Risk Mitigation

### Risk: Google API Quotas Exceeded
**Mitigation:** 
- Implement result caching (save POI queries, distance calculations)
- Use mock data for development
- Monitor API usage daily

### Risk: Integration Issues Between Developers
**Mitigation:**
- Document API formats early
- Use mock data to develop in parallel
- Schedule regular integration checkpoints

### Risk: Time Overruns on Complex Features
**Mitigation:**
- Start with MVP version of each feature
- Polish later if time allows
- Prioritize critical path (map → analysis → save → report)

### Risk: Gemini API Latency or Failures
**Mitigation:**
- Implement fallback template-based insights
- Cache generated insights
- Async generation option (show scores first, insights load later)

---

## Success Criteria

By end of hackathon, the demo must show:

✅ Landing page with clear branding and "Coba Demo" button  
✅ User can navigate from landing to Intelligence Planner  
✅ User can search and select a location on map (centered on DKI Jakarta by default)  
✅ User can toggle 2D/3D views  
✅ User can view existing SPKLU/SPBKLU stations (realistic density distribution)  
✅ User can analyze a location and see scores  
✅ User can read AI-generated insights in Bahasa Indonesia  
✅ User can save location to a new or existing project  
✅ User can view projects and locations  
✅ User can compare multiple locations side-by-side  
✅ User can generate and download a PDF report in Bahasa Indonesia with SIVANA branding  
✅ All flows work end-to-end without crashes  
✅ All UI text and content in Bahasa Indonesia  
✅ Projects persist using localStorage + Supabase hybrid  

---

## Questions - ANSWERED

1. ✅ **Which Indonesian cities should we prioritize for demo?**  
   **Answer:** Prioritize major cities and surrounding areas (Jakarta, Surabaya, Bandung, Medan, Semarang)

2. ✅ **How many mock SPKLU/SPBKLU stations do we need?**  
   **Answer:** ~80-100 stations with realistic density:
   - Metropolitan areas: Dense (every 2-5km)
   - Suburban: Moderate (every 5-10km)
   - Non-metropolitan: Sparse (every 10-20km)

3. ✅ **What project statuses do we want?**  
   **Answer:** Keep it simple - no status workflow for MVP

4. ✅ **Should we implement user roles?**  
   **Answer:** Keep simple for MVP - no RBAC

5. ✅ **Do we need multi-language support?**  
   **Answer:** Bahasa Indonesia only for hackathon

6. ✅ **What should be the default map center/zoom level?**  
   **Answer:** DKI Jakarta province (-6.2088, 106.8456) at appropriate zoom to show full province

7. ✅ **How should we handle logo/branding in reports?**  
   **Answer:** Use the platform's (SIVANA) logo and branding

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-10  
**Next Review:** Daily standup