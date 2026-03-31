---
description: Create and apply a design system (theme, colors, fonts, shapes) to a Stitch project
---

# Stitch Design System Workflow

This workflow creates, updates, and applies design systems to your Stitch projects.

## Steps

### Creating a Design System

1. **Create a design system** using `mcp_StitchMCP_create_design_system`:
   - Provide the `projectId` to associate it with a project (or omit for a global design system)
   - Configure the `designSystem` object with:
     - **Color Palette**: Use presets or set a custom primary color (hex) and saturation level
     - **Typography**: Choose a font family (e.g., `INTER`, `ROBOTO`, `OUTFIT`, `SPACE_GROTESK`, `PUBLIC_SANS`, `SPLINE_SANS`)
     - **Shape**: Set corner roundness for UI elements (e.g., `ROUND_EIGHT`, `ROUND_SIXTEEN`)
     - **Appearance**: Configure light/dark mode background colors
     - **Design MD**: Add free-form design instructions in markdown

2. **Immediately update the design system** using `mcp_StitchMCP_update_design_system` after creation to apply and display it.

### Applying a Design System to Screens

3. **List available design systems** using `mcp_StitchMCP_list_design_systems` with the `projectId`.

4. **Apply it to screens** using `mcp_StitchMCP_apply_design_system`:
   - Provide the `projectId`
   - Provide the `assetId` of the design system
   - Provide `selectedScreenInstances` — the screen instances to apply the design to (get these from `mcp_StitchMCP_get_project`)

### Updating an Existing Design System

5. **Update the design system** using `mcp_StitchMCP_update_design_system`:
   - Provide the `name` in format `assets/{asset_id}`
   - Provide the `projectId`
   - Provide the updated `designSystem` object

## Available Design Tokens

### Fonts
`INTER`, `ROBOTO`, `OUTFIT`, `SPACE_GROTESK`, `PUBLIC_SANS`, `SPLINE_SANS`

### Roundness
`ROUND_FOUR`, `ROUND_EIGHT`, `ROUND_TWELVE`, `ROUND_SIXTEEN`, `ROUND_FULL`

### Color Modes
`LIGHT`, `DARK`

### Saturation
`1` (low) to `5` (high)
