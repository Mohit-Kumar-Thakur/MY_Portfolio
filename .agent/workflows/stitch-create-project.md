---
description: Create a new Google Stitch project and generate UI screens from text prompts
---

# Create a New Stitch Project

This workflow creates a new Google Stitch project and generates screens using AI.

## Steps

1. **Create the project** using `mcp_StitchMCP_create_project` with a descriptive title.

2. **Generate screens from text** using `mcp_StitchMCP_generate_screen_from_text`:
   - Provide the `projectId` from step 1
   - Write a detailed `prompt` describing the screen (e.g., "A modern dashboard with analytics charts, dark mode, sidebar navigation")
   - Set `deviceType` to one of: `MOBILE`, `DESKTOP`, `TABLET`, or `AGNOSTIC`
   - Optionally choose a `modelId`: `GEMINI_3_PRO`, `GEMINI_3_FLASH`, or `GEMINI_3_1_PRO`
   - **Note**: Generation can take a few minutes. Do NOT retry.

3. **Verify the screen** using `mcp_StitchMCP_get_screen` with the projectId and screenId.

4. **Generate additional screens** by repeating step 2 for each page/view needed.

## Tips
- Be very descriptive in your prompts for better results
- Specify the device type to get properly sized screens
- Use `GEMINI_3_1_PRO` for the highest quality output
