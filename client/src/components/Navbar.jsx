import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { text: 'Audit', path: '/audit' },
    { text: 'Pricing', path: '/pricing' },
    { text: 'About', path: '/about' },
  ]

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 10 : 0}
        sx={{
          background: scrolled 
            ? 'rgba(15, 23, 42, 0.95)'
            : 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h5" 
                component={Link} 
                to="/"
                sx={{
                  fontWeight: 800,
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                AI Spend Audit
              </Typography>
            </motion.div>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button 
                    component={Link} 
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? '#6366f1' : 'white',
                      '&:hover': {
                        background: 'rgba(99, 102, 241, 0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to="/audit"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Free Audit
                </Button>
              </motion.div>
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            width: 280,
          },
        }}
      >
        <List sx={{ mt: 8 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={Link} 
              to={item.path}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  sx: { color: location.pathname === item.path ? '#6366f1' : 'white' }
                }}
              />
            </ListItem>
          ))}
          <ListItem>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/audit"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Start Free Audit
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Navbar