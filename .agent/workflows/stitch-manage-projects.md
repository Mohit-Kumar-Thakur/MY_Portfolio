---
description: List, view, and manage existing Google Stitch projects and screens
---

# Manage Stitch Projects

This workflow covers viewing and managing your existing Stitch projects.

## Listing Projects

1. **List all projects** using `mcp_StitchMCP_list_projects`:
   - Default: Lists projects you own
   - Use `filter: "view=shared"` to see projects shared with you

## Viewing Project Details

2. **Get project details** using `mcp_StitchMCP_get_project`:
   - Provide `name` in format `projects/{project_id}`
   - Returns: title, design theme, screen instances, device type, etc.

## Viewing Screens

3. **List all screens** in a project using `mcp_StitchMCP_list_screens` with the `projectId`.

4. **Get screen details** using `mcp_StitchMCP_get_screen`:
   - Provide `name` in format `projects/{project_id}/screens/{screen_id}`
   - Provide `projectId` and `screenId` separately as well

## Viewing Design Systems

5. **List design systems** using `mcp_StitchMCP_list_design_systems`:
   - Provide `projectId` for project-specific design systems
   - Omit `projectId` for global design systems
