/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: Please provide a valid email address
 *                       password:
 *                         type: string
 *                         example: Password is required
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Too many requests, please try again later.
 *       500:
 *         description: Internal server error
 *
 * /v1/auth/register/:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user with an invitation token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - middleName
 *               - lastName
 *               - email
 *               - password
 *               - gender
 *               - dateOfBirth
 *               - yearOfExpirence
 *               - token
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Test
 *               middleName:
 *                 type: string
 *                 example: Test
 *               lastName:
 *                 type: string
 *                 example: Test
 *               email:
 *                 type: string
 *                 example: amanuel3@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *               gender:
 *                 type: string
 *                 example: Male
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01T00:00:00.000Z
 *               yearOfExpirence:
 *                 type: integer
 *                 example: 5
 *               title:
 *                 type: string
 *                 example: Dr.
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               profession:
 *                 type: string
 *                 example: Biochemist
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       201:
 *         description: User registered with invitation successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: amanuel3@gmail.com
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessages:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: First name is required
 *       500:
 *         description: Internal server error
 *
 * /v1/auth/register/invite:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Invite a user to register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: amanuelvac@gmail.com
 *     responses:
 *       200:
 *         description: Invitation sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invitation sent successfully!
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: Please provide a valid email address
 *       500:
 *         description: Internal server error
 *
 * /v1/auth/register/verify:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify user invitation token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: amanuelvac@gmail.com
 *                     iat:
 *                       type: integer
 *                       example: 1725530070
 *                     exp:
 *                       type: integer
 *                       example: 1725533670
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token
 *       500:
 *         description: Internal server error
 *
 * /v1/auth/password/forgot:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Forgot password request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: amaniase084@gmail.com
 *     responses:
 *       200:
 *         description: Password reset request successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Please provide a valid email
 *       500:
 *         description: Internal server error
 *
 * /v1/auth/password/reset/me:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset user's own password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: OldSecretPassword123
 *               newPassword:
 *                 type: string
 *                 example: NewSecretPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Old password is incorrect
 *       500:
 *         description: Internal server error
 *
 * /v1/user/profile/me:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get current user's profile
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: Amanuel
 *                     middleName:
 *                       type: string
 *                       example: Tesfaye
 *                     lastName:
 *                       type: string
 *                       example: Gebre
 *                     gender:
 *                       type: string
 *                       example: Male
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                       example: 1990-01-01T00:00:00.000Z
 *                     yearsOfExperience:
 *                       type: integer
 *                       example: 2
 *                     email:
 *                       type: string
 *                       example: admin@mail.com
 *                     title:
 *                       type: string
 *                       example: Software Engineer
 *                     phone:
 *                       type: string
 *                       example: +251911223344
 *                     profession:
 *                       type: string
 *                       example: Fullstack Developer
 *                     profileImage:
 *                       type: string
 *                       example: 1726345249137-art.jpg
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-10T15:14:22.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-14T20:20:49.000Z
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     tags:
 *       - Profile
 *     summary: Update current user's profile
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Amanuel
 *               middleName:
 *                 type: string
 *                 example: Tesfaye
 *               lastName:
 *                 type: string
 *                 example: Gebre
 *               email:
 *                 type: string
 *                 example: amanuel@example.com
 *               password:
 *                 type: string
 *                 example: password
 *               gender:
 *                 type: string
 *                 example: Male
 *               dateOfBirth:
 *                 type: string
 *                 format: date-time
 *                 example: 1990-01-01T00:00:00.000Z
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 5
 *               title:
 *                 type: string
 *                 example: Dr.
 *               phone:
 *                 type: string
 *                 example: +251911223344
 *               profession:
 *                 type: string
 *                 example: Biochemist
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete current user's profile
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile deleted successfully
 *       500:
 *         description: Internal server error
 *
 * /v1/user/profile/{id}:
 *   patch:
 *     tags:
 *       - Profile
 *     summary: Update a specific user's profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Amanuel
 *               middleName:
 *                 type: string
 *                 example: Tesfaye
 *               lastName:
 *                 type: string
 *                 example: Gebre
 *               email:
 *                 type: string
 *                 example: amanuel@example.com
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete a specific user's profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * /v1/user/profile/:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Retrieve the authenticated user's profile
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: Amanuel
 *                 middleName:
 *                   type: string
 *                   example: Tesfaye
 *                 lastName:
 *                   type: string
 *                   example: Gebre
 *                 email:
 *                   type: string
 *                   example: amanuel@example.com
 *                 phone:
 *                   type: string
 *                   example: +251911223344
 *                 RoleId:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * /v1/indicators:
 *   get:
 *     tags:
 *       - Indicators
 *     summary: Retrieve a list of indicators
 *     responses:
 *       200:
 *         description: List of indicators fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Temperature
 *                   value_type:
 *                     type: string
 *                     example: Celsius
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Indicators
 *     summary: Create a new indicator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - value_type
 *             properties:
 *               name:
 *                 type: string
 *                 example: pH Level
 *               value_type:
 *                 type: string
 *                 example: Numeric
 *     responses:
 *       201:
 *         description: Indicator created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: pH Level
 *                 value_type:
 *                   type: string
 *                   example: Numeric
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 * /v1/indicators/{id}:
 *   get:
 *     tags:
 *       - Indicators
 *     summary: Get details of a specific indicator by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Indicator ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Indicator details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Temperature
 *                 value_type:
 *                   type: string
 *                   example: Celsius
 *       404:
 *         description: Indicator not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     tags:
 *       - Indicators
 *     summary: Update an existing indicator
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Indicator ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Humidity
 *               value_type:
 *                 type: string
 *                 example: Percentage
 *     responses:
 *       200:
 *         description: Indicator updated successfully
 *       404:
 *         description: Indicator not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Indicators
 *     summary: Delete an indicator
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Indicator ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Indicator deleted successfully
 *       404:
 *         description: Indicator not found
 *       500:
 *         description: Internal server error
 *
 * /v1/indicators-value-types/values:
 *   get:
 *     tags:
 *       - Indicator Value Types
 *     summary: Get all indicator value types
 *     responses:
 *       200:
 *         description: List of indicator value types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   value_type:
 *                     type: string
 *                     example: Numeric
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Indicator Value Types
 *     summary: Create a new indicator value type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value_type
 *             properties:
 *               value_type:
 *                 type: string
 *                 example: Boolean
 *     responses:
 *       201:
 *         description: Indicator value type created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 * /v1/indicators-value-types/values/{id}:
 *   patch:
 *     tags:
 *       - Indicator Value Types
 *     summary: Update an indicator value type
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value_type:
 *                 type: string
 *                 example: Text
 *     responses:
 *       200:
 *         description: Indicator value type updated successfully
 *       404:
 *         description: Value type not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Indicator Value Types
 *     summary: Delete an indicator value type
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Indicator value type deleted successfully
 *       404:
 *         description: Value type not found
 *       500:
 *         description: Internal server error
 *
 * /v1/reports:
 *   post:
 *     tags:
 *       - Reports
 *     summary: Create a new report
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               indicatorId:
 *                 type: integer
 *                 example: 1
 *               value:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["value1", "value2"]
 *               submittedBy:
 *                 type: integer
 *                 description: ID of the user who submitted the report
 *                 example: 1001
 *               month:
 *                 type: string
 *                 example: "2024-09"
 *     responses:
 *       201:
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {"id": 1, "indicatorId": 1, "submittedBy": 1001, "month": "2024-09", "value": ["value1", "value2"]}
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 * /v1/reports-meta/meta:
 *   get:
 *     tags:
 *       - Reports
 *     summary: List all reports with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         example: 10
 *       - in: query
 *         name: filters
 *         schema:
 *           type: object
 *         description: Filters to apply
 *         example: {"search": "2024-09"}
 *     responses:
 *       200:
 *         description: Reports fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: {"id": 1, "indicatorId": 1, "submittedBy": 1001, "month": "2024-09", "value": ["value1", "value2"]}
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Internal server error
 *
 * /v1/reports-meta/meta/category:
 *   get:
 *     tags:
 *       - Reports
 *     summary: List reports by category with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term (e.g., month or category)
 *         example: "2024-09"
 *     responses:
 *       200:
 *         description: Reports by category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: {"reportYearMonth": "2024-09", "totalReports": 23, "User": {"id": 1, "firstName": "Amanuel", "lastName": "Sisay"}}
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Internal server error
 *
 * /v1/reports/{id}:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Get a report by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Report ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Report fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {"id": 1, "indicatorId": 1, "submittedBy": 1001, "month": "2024-09", "value": ["value1", "value2"]}
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     tags:
 *       - Reports
 *     summary: Update a report by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Report ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               indicatorId:
 *                 type: integer
 *                 example: 1
 *               value:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["updatedValue1", "updatedValue2"]
 *               submittedBy:
 *                 type: integer
 *                 description: ID of the user who submitted the report
 *                 example: 1001
 *               month:
 *                 type: string
 *                 example: "2024-09"
 *     responses:
 *       200:
 *         description: Report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {"id": 1, "indicatorId": 1, "submittedBy": 1001, "month": "2024-09", "value": ["updatedValue1", "updatedValue2"]}
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Reports
 *     summary: Delete a report by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Report ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Report deleted successfully"
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
