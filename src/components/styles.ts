export const styles = {
  loadingImageBox:{ width: "100%", height: "100vh", overflow: "hidden" },
  loadingImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    overflow: "hidden",
  },
  tabs: {
    "& .MuiButtonBase-root.MuiTabScrollButton-root": {
      width: "20px",
      bgcolor: "#1a232e",
      borderRadius: 5,
      boxShadow: 30,
      mx: 0.5,
      color: "white",
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      paddingTop: "0px",
      paddingBottom: "0px",
      minHeight: "20px",
      mt: 0.5,
      textTransform: "capitalize",
      mr: 0.5,
      borderRadius: 30,
      border: "2px solid #1a232e",
      color: "#1a232e",
      fontWeight: 600,
    },
    "&.MuiTabs-root .MuiButtonBase-root.MuiTab-root.Mui-selected": {
      color: "white",
      bgcolor: "#1a232e",
      fontWeight: 700,
    },
    "& .MuiTabs-root.MuiButtonBase-root.MuiTab-root.Mui-selected": {
      color: "yellow",
      bgcolor: "yellow",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  chartHeading: {
    display: { xs: "none", sm: "block" },
    width: { xs: "150px", sm: "220px" },
    fontWeight: 700,
    fontSize: "11px",
    position: "absolute",
    left: "20px",
    top: "10px",
    textDecoration: "underline",
  },
  title: {
    textAlign: "center",
    fontSize: "clamp(1rem, -0.0938rem + 3.5vw, 1.875rem)",
    fontWeight: 600,
    color: "#1a232e",
    mt: 5,
    mb: 2,
  },
  mainBox: { pb: 8 },
  tableMainBox: {
    bgcolor: "white",
    border: "1px solid rgb(216, 216, 216)",
    borderRadius: 3,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  textFieldsBox: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    my: 2,
    mx: 2,
    gap: { xs: 1, md: 0 },
  },
  tableContainer: { maxHeight: 440 },
  tablePaper: { width: "100%", overflow: "hidden" },
  tooltip: {
    position: "absolute",
    right: "5px",
    top: "10px",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    "& svg": { cursor: "pointer" },
  },
  chartMainBox: {
    position: "relative",
    height: "350px",
    width: "100%",

    bgcolor: "white",
    border: "1px solid rgb(216, 216, 216)",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    pt: 1,
    boxShadow:
      " rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  },
  tooltipMainBox: { bgcolor: "white", p: 1, borderRadius: 2, boxShadow: 5 },
  tooltipMakeName: {
    fontWeight: 600,
    fontSize: "15px",
    textTransform: "capitalize",
  },
  tooltipValue: (fill: string) => ({
    color: fill,
    fontWeight: 600,
    fontSize: "13px",
  }),
  makeNameMainBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
    transform: "translateY(-20px)",
  },
  makeNameBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  makeNameDot: (fill: string) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    bgcolor: fill,
  }),
  makeName: {
    fontSize: "12px",
    textTransform: "none",
  },
  textField: {
    "& .MuiInputBase-input": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .MuiInputBase-input::placeholder": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  textFieldMainBox: (isSelected: boolean) => ({
    width: isSelected ? { xs: "100%", md: "900px" } : "0px",
    transition: "1s ease",
    overflow: "hidden",
  }),
  datNotFound: { textAlign: "center", width: "100%" },
  headingText: { width: "200px", fontWeight: 700 },
  header: (isCrossed: boolean) => ({
    height: { xs: "60px", sm: "80px" },
    bgcolor: "#1a232e",
    display: "flex",
    boxShadow: isCrossed ? 3 : 0,
    alignItems: "center",
    transition: "1s ease",
    position: isCrossed ? "sticky" : "static",
    top: isCrossed ? "0px" : "-100px",
    zIndex: 2,
  }),
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { height: { xs: "20px", md: "50px" } },
  name: {
    color: "white",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontWeight: 700,
    animation: "widthAnimation 3s ease infinite",
    "@keyframes widthAnimation": {
      from: { width: "0%" },
      to: { width: "100%" },
    },
  },
  grid2: { xs: 12, md: 6 },
};
