const express = require('express');
const foundationController = require('../controllers/foundation-controller');
const publicController = require('../controllers/public-controller');
const authController = require('../controllers/auth-controller');
const { contactLimiter } = require('../middleware/rate-limiters');

const router = express.Router();

router.get('/', publicController.showHome);
router.post('/auth/google', authController.googleLogin);
router.post('/auth/logout', authController.logout);
router.get('/about', publicController.showAbout);
router.get('/journey', (req, res) => res.redirect(302, '/about#journey-title'));
router.get('/services', publicController.showServices);
router.get('/projects', publicController.showProjects);
router.get('/projects/:slug', publicController.showProjectDetail);
router.get('/skills', publicController.showSkills);
router.get('/certifications', publicController.showCertifications);
router.get('/resume', publicController.showResume);
router.get('/contact', publicController.showContact);
router.post('/contact', contactLimiter, publicController.submitContact);
router.get('/accessibility', publicController.showAccessibility);
router.get('/privacy', publicController.showPrivacy);
router.get('/foundation', foundationController.showFoundation);
router.get('/health', foundationController.healthCheck);

module.exports = router;
