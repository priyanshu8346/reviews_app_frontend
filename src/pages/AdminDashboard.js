import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [chartData, setChartData] = useState([
    { name: "5 Stars", value: 20 },
    { name: "4 Stars", value: 15 },
    { name: "3 Stars", value: 8 },
    { name: "2 Stars", value: 5 },
    { name: "1 Star", value: 3 },
  ]);

  const [satisfactionData, setSatisfactionData] = useState([
    { name: "Satisfied", value: 30 },
    { name: "Neutral", value: 10 },
    { name: "Unsatisfied", value: 5 },
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, email: "user1@email.com", review: "Great product!", rating: 5 },
    { id: 2, email: "user2@email.com", review: "Not bad", rating: 3 },
    { id: 3, email: "user3@email.com", review: "Could be better", rating: 2 },
  ]);

  const [suggestions, setSuggestions] = useState(null);
  const [summary, setSummary] = useState(null);

  const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"];

  // Refresh charts dynamically
  const refreshInsights = () => {
    setChartData([
      { name: "5 Stars", value: Math.floor(Math.random() * 20) + 5 },
      { name: "4 Stars", value: Math.floor(Math.random() * 20) + 5 },
      { name: "3 Stars", value: Math.floor(Math.random() * 10) + 2 },
      { name: "2 Stars", value: Math.floor(Math.random() * 8) + 1 },
      { name: "1 Star", value: Math.floor(Math.random() * 5) + 1 },
    ]);

    setSatisfactionData([
      { name: "Satisfied", value: Math.floor(Math.random() * 40) + 10 },
      { name: "Neutral", value: Math.floor(Math.random() * 20) + 5 },
      { name: "Unsatisfied", value: Math.floor(Math.random() * 10) + 2 },
    ]);
  };

  const markAsSpam = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const getSuggestions = () => {
    setSuggestions("Improve response time and product quality.");
  };

  const loadSummary = () => {
    setSummary("Overall, users are mostly satisfied but want faster delivery.");
  };

  return (
    <Box p={3}>
      {/* Logout Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="error">
          Logout
        </Button>
      </Box>

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
                  <Bar dataKey="value" fill="#2196f3">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <TableCell>Email</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.email}</TableCell>
                  <TableCell>{review.review}</TableCell>
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
