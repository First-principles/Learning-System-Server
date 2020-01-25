const RouteNames = {
    base: "/",
    AddUser: "/register",
    Login: "/login",
    AddLesson: "/courses/:course/lessons",
    AddCourse: "/courses",
    AddComment: "/courses/:course/lessons/:lesson/comments",
    lesson: "/courses/:course/lessons/:lesson",
    comment: "/courses/:course/lessons/:lesson/comments/:comment",
    user: "/users/:user",
    profile: "/users/:user/profile",
};

module.exports = { RouteNames };