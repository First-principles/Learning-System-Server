var router = require('express').Router();
const { RouteNames } = require("../../constants/constants");

router.use(RouteNames.base, require('./lessons'));
router.use(RouteNames.base, require('./courses'));
router.use(RouteNames.base, require('./users'));
router.use(RouteNames.base, require('./comments'));

router.use(function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }
    return next(err);
});

module.exports = router;