import { Box, Typography } from "@mui/material";

const Gallery = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Gallery</Typography>
      <Typography variant="body1">
        {/* Add your content here */}
        Browse through our gallery to see our work.
      </Typography>
    </Box>
  );
};

export default Gallery;
