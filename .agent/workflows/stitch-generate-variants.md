---
description: Generate design variants (alternative versions) of screens in a Stitch project
---

# Generate Screen Variants

This workflow generates alternative design variants of existing screens for comparison and iteration.

## Steps

1. **Identify the screen** to generate variants for using `mcp_StitchMCP_list_screens` or `mcp_StitchMCP_get_screen`.

2. **Generate variants** using `mcp_StitchMCP_generate_variants`:
   - Provide the `projectId`
   - Provide `selectedScreenIds` — the screen(s) to generate variants for
   - Write a `prompt` that guides the variation (e.g., "Create variants with different color schemes and layout options")
   - Configure `variantOptions`:
     - **Number of variants**: How many alternatives to generate
     - **Creative range**: How different the variants should be from the original
     - **Aspects to focus on**: What design aspects to vary (layout, colors, typography, etc.)
   - Optionally set `deviceType` and `modelId`

3. **Review variants** using `mcp_StitchMCP_get_project` to see all generated screen instances.

## Use Cases
- Exploring different color schemes for a page
- Comparing layout options (grid vs. list, sidebar vs. top nav)
- A/B testing different hero section designs
- Iterating on a design with stakeholders
