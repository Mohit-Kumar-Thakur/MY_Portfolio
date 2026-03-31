---
description: Design a complete multi-page website using Google Stitch from scratch
---

# Design a Full Website with Google Stitch

This is the master workflow to design a complete, multi-page website using all Stitch features.

## Phase 1: Project Setup

1. **Create the project** using `mcp_StitchMCP_create_project` with a descriptive title for the website.

## Phase 2: Design System

2. **Create a design system** using `mcp_StitchMCP_create_design_system`:
   - Set color palette (custom primary color + saturation)
   - Choose typography (font family)
   - Set shape roundness
   - Set color mode (LIGHT or DARK)
   - Add any design markdown notes

3. **Update the design system** using `mcp_StitchMCP_update_design_system` immediately after creation to apply it.

## Phase 3: Screen Generation

4. **Generate the homepage** using `mcp_StitchMCP_generate_screen_from_text`:
   - Use a detailed prompt describing the homepage layout, hero section, features, etc.
   - Set `deviceType` to `DESKTOP` (or `MOBILE` for mobile-first)

5. **Generate additional pages** (repeat for each):
   - About page
   - Services/Products page
   - Contact page
   - Blog/Portfolio page
   - Login/Signup page
   - Dashboard/App page
   - Any other pages needed

## Phase 4: Apply Design System

6. **Get project details** using `mcp_StitchMCP_get_project` to retrieve all screen instances.

7. **Apply the design system** using `mcp_StitchMCP_apply_design_system` to all screens for visual consistency.

## Phase 5: Refinement

8. **Edit individual screens** using `mcp_StitchMCP_edit_screens` to refine specific elements.

9. **Generate variants** using `mcp_StitchMCP_generate_variants` to explore alternative designs for key pages.

## Phase 6: Review

10. **Review all screens** using `mcp_StitchMCP_list_screens` and `mcp_StitchMCP_get_screen` to verify the final designs.

## Tips
- Start with the most important page (usually the homepage)
- Use consistent language in prompts to maintain design coherence
- Apply the design system AFTER generating all screens for efficiency
- Generate variants for the homepage and landing pages to find the best design
- Use `GEMINI_3_1_PRO` model for highest quality output
