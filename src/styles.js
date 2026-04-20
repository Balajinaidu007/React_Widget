export const styles = {
  container: {
    fontFamily: "Arial",
    padding: 12,
    maxWidth: 600,
    margin: "0 auto",
  },

  dropZone: {
    border: "2px dashed #888",
    padding: 25, // reduced from 50
    textAlign: "center",
    borderRadius: 8,
    background: "#fafafa",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 15,
    maxHeight: "70vh",        // prevents huge vertical growth
    overflowY: "auto",        // enables internal scroll
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  body: {
    marginBottom: 10,
  },

  footer: {
    marginTop: 8,
  },

  successBox: {
    background: "#e6ffed",
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
  },

  errorBox: {
    background: "#ffe6e6",
    padding: 10,
    borderRadius: 4,
  },

  errorText: {
    color: "red",
    marginTop: 6,
    fontSize: 14,
  },
};
