import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import {
  Security as SecurityIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  AutoAwesome as AIIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  Book as BookIcon,
  Timeline as TimelineIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const Features = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const features = [
    {
      title: 'Role-Based Authentication',
      description:
        'Secure access control with different user roles: Students, Instructors, Admins, and Super Admins. Each role has specific permissions and access levels.',
      icon: (
        <SecurityIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      category: 'Security',
      highlights: [
        'Multi-level access control',
        'Secure login system',
        'Permission management',
      ],
    },
    {
      title: 'Course Creation & Management',
      description:
        'Instructors can create, edit, and manage courses with rich content including videos, documents, and interactive materials.',
      icon: (
        <BookIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      category: 'Content',
      highlights: [
        'Rich content editor',
        'File management',
        'Course templates',
      ],
    },
    {
      title: 'Student Enrollment System',
      description:
        'Streamlined enrollment process with automatic course assignment, progress tracking, and enrollment management.',
      icon: (
        <GroupIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      category: 'Management',
      highlights: [
        'Manual enrollment',
        'Progress tracking',
        'Enrollment analytics',
      ],
    },
    {
      title: 'Advanced Grading System',
      description:
        'Comprehensive grading with multiple assessment types, grade calculation, and detailed performance analytics.',
      icon: (
        <AssessmentIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      category: 'Assessment',
      highlights: [
        'Multiple grading scales',
        'Performance analytics',
        'Grade history',
      ],
    },
    {
      title: 'Interactive Quizzes',
      description:
        'Create engaging quizzes with multiple question types, time limits, and instant feedback for better learning outcomes.',
      icon: (
        <QuizIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      category: 'Assessment',
      highlights: [
        'Multiple question types',
        'Time limits',
        'Instant feedback',
      ],
    },
    {
      title: 'AI-Powered Real-Time Assessments',
      description:
        'Intelligent assessment system that adapts to student performance and provides personalized learning recommendations.',
      icon: <AIIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      category: 'AI',
      highlights: [
        'Adaptive learning',
        'Personalized feedback',
        'Performance prediction',
      ],
    },
    {
      title: 'Assignment Management',
      description:
        'Comprehensive assignment system with submission tracking, plagiarism detection, and detailed feedback mechanisms.',
      icon: (
        <AssignmentIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      category: 'Assessment',
      highlights: [
        'Submission tracking',
        'Plagiarism detection',
        'Detailed feedback',
      ],
    },
    {
      title: 'Cumulative Grading System',
      description:
        'Track student performance across all assessments with cumulative grade calculation, grade history, and performance trends.',
      icon: (
        <TimelineIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      category: 'Assessment',
      highlights: [
        'Cumulative grade calculation',
        'Grade history',
        'Performance trends',
      ],
    },
    {
      title: 'Smart Notifications',
      description:
        'Intelligent notification system that keeps students and instructors informed about deadlines, grades, and important updates.',
      icon: (
        <NotificationsIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      category: 'Communication',
      highlights: [
        'Smart alerts',
        'Customizable notifications',
        'Multi-channel delivery',
      ],
    },
  ];

  const categories = [...new Set(features.map((f) => f.category))];

  // Filter features based on selected category
  const filteredFeatures =
    selectedCategory && selectedCategory !== 'All'
      ? features.filter((feature) => feature.category === selectedCategory)
      : features;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Platform Features
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Discover the powerful features that make our e-learning platform the
          perfect solution for modern education
        </Typography>
      </Box>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Filter by Category
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          <Chip
            label="All"
            variant={
              selectedCategory === 'All' || selectedCategory === null
                ? 'filled'
                : 'outlined'
            }
            color={
              selectedCategory === 'All' || selectedCategory === null
                ? 'primary'
                : 'default'
            }
            onClick={() => handleCategoryClick('All')}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          />
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 3 },
          mb: 4,
          '& > *': {
            flex: '1 1 300px',
            minWidth: '280px',
            maxWidth: {
              xs: '100%',
              sm: 'calc(50% - 12px)',
              lg: 'calc(33.333% - 16px)',
            },
          },
        }}
      >
        {filteredFeatures.map((feature, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              },
              border: `1px solid ${theme.palette.divider}`,
              width: '100%',
              height: '250px',
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2.5, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: { xs: 1, sm: 1.5 },
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    mr: { xs: 1, sm: 1.5 },
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1rem', sm: '1rem' },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Chip
                    label={feature.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                  />
                </Box>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.4,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  mb: 1.5,
                }}
              >
                {feature.description}
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                >
                  Key Highlights:
                </Typography>
                <Box component="ul" sx={{ pl: 1.5, m: 0 }}>
                  {feature.highlights.map((highlight, idx) => (
                    <Typography
                      key={idx}
                      component="li"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 0.25,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        lineHeight: 1.3,
                        '&::marker': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {highlight}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        textAlign="center"
        sx={{
          mt: 8,
          p: 4,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Ready to Experience These Features?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mb: 3,
          }}
        >
          Join our platform today and discover how these powerful features can
          transform your learning experience.
        </Typography>
        <SchoolIcon
          sx={{
            fontSize: 60,
            color: theme.palette.primary.main,
            opacity: 0.8,
          }}
        />
      </Box>
    </Box>
  );
};

export default Features;
