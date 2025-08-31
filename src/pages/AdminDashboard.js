import React, { useState, useEffect } from "react";
import {
  Card, CardContent, Typography, Button, Grid, Box,
  Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress
} from "@mui/material";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useSnackbar } from "notistack";  // <-- NEW
import api from "../services/api";

export default function AdminDashboard() {
  const { enqueueSnackbar } = useSnackbar(); // <-- NEW
  const [chartData, setChartData] = useState([]);
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"];

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/admin/reviews");
        if (data.success) {
        const dist = data.ratingDistribution || {};
        const transformed = [1,2,3,4,5].map(rating => ({
          name: `${rating} Star`,
          value: dist[rating] || 0
        }));
        setChartData(transformed);
      }
        setSatisfactionData(data.satisfaction || []);
        setReviews(data.reviews || []);
        console.log(data)
        enqueueSnackbar("Analytics loaded", { variant: "success" });
      } catch (err) {
        enqueueSnackbar("Failed to fetch analytics", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [enqueueSnackbar]);

  const refreshInsights = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/reviews");
      if (data.success) {
        const dist = data.ratingDistribution || {};
        const transformed = [1,2,3,4,5].map(rating => ({
          name: `${rating} Star`,
          value: dist[rating] || 0
        }));
        setChartData(transformed);
      }
      setSatisfactionData(data.satisfaction || []);
      enqueueSnackbar("Insights refreshed", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to refresh insights", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const markAsSpam = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/admin/reviews/${id}`);
      setReviews((prev) => prev.filter((review) => review.id !== id));
      enqueueSnackbar("Review marked as spam", { variant: "warning" });
    } catch (err) {
      enqueueSnackbar("Failed to mark review as spam", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/suggestions");
      console.log(data)
      setSuggestions(data.message || "No suggestions available.");
      enqueueSnackbar("Improvement suggestions loaded", { variant: "info" });
    } catch (err) {
      enqueueSnackbar("Failed to fetch suggestions", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/summary");
      const data = response.data
      console.log(response)
      setSummary(data.summary || "No summary available.");
      enqueueSnackbar("Summary loaded", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to fetch summary", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      {/* Logout Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="error" onClick={() => {localStorage.removeItem("token"); window.location.href = "/adminLogin";}}>
          Logout
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      )}

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md="auto" className="w-[20rem]">
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rating Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md="auto" className="w-[20rem]">
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Satisfaction
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Admin Action Buttons */}
      <Box mt={4} display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={refreshInsights}>
          Refresh Insights
        </Button>
        <Button variant="contained" color="secondary" onClick={getSuggestions}>
          Get Improvement Suggestions
        </Button>
        <Button variant="contained" color="success" onClick={loadSummary}>
          Load Summary
        </Button>
      </Box>

      {/* Suggestions & Summary */}
      {suggestions && (
        <Box mt={2}>
          <Card sx={{ boxShadow: 2, borderRadius: 3, p: 2 }}>
            <Typography variant="h6">Suggestions:</Typography>
            <Typography>{suggestions}</Typography>
          </Card>
        </Box>
      )}

      {summary && (
        <Box mt={2}>
          <Card sx={{ boxShadow: 2, borderRadius: 3, p: 2 }}>
            <Typography variant="h6">Summary:</Typography>
            <Typography>{summary}</Typography>
          </Card>
        </Box>
      )}

      {/* Reviews Table */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          User Reviews
        </Typography>
        <Paper sx={{ boxShadow: 3, borderRadius: 3 }}>
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell>UserId</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{review.user}</TableCell>
                  <TableCell>{review.text}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => markAsSpam(review.id)}
                    >
                      Mark as Spam
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
