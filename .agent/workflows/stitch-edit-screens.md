---
description: Edit existing screens in a Stitch project using text prompts
---

# Edit Stitch Screens

This workflow edits existing screens in a Stitch project using AI-powered text prompts.

## Steps

1. **List screens** using `mcp_StitchMCP_list_screens` with the `projectId` to see all available screens.

2. **Get screen details** using `mcp_StitchMCP_get_screen` to inspect a specific screen before editing.

3. **Edit the screen** using `mcp_StitchMCP_edit_screens`:
   - Provide the `projectId`
   - Provide `selectedScreenIds` — an array of screen IDs to edit
   - Write a clear `prompt` describing the changes (e.g., "Change the hero section to use a gradient background and add a call-to-action button")
   - Optionally set `deviceType` and `modelId`
   - **Note**: This can take a few minutes. Do NOT retry.

4. **Verify changes** using `mcp_StitchMCP_get_screen` to confirm the edits were applied.

## Tips
- You can edit multiple screens at once by passing multiple IDs
- Be specific about what to change — reference specific elements (buttons, headers, cards, etc.)
- Describe the desired end state, not just "make it better"
