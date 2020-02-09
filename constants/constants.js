const RouteNames = {
    base: "/",
    AddUser: "/register",
    Login: "/login",
    AddLesson: "/courses/lessons",
    AddCourse: "/courses",
    AddArticle: "/articles",
    AddComment: "/courses/lessons/comments",
    lesson: "/courses/:course/lessons/:lesson",
    comment: "/courses/:course/lessons/:lesson/comments/:comment",
    user: "/users/:user",
    profile: "/users/:user/profile",
    update:'/users/update'
};

module.exports = { RouteNames };