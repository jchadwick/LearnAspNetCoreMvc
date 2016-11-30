$(function initializeCommentComponents() {

    $(document).on('click', '.show-comments', function (evt) {
        evt.stopPropagation();
        new Post(this).showComments();
        return false;
    });

    $(document).on('click', '.add-comment', function (evt) {
        evt.stopPropagation();
        new Post(this).showAddComment();
        return false;
    });

    $(document).on('submit', '.new-comment form', function (evt) {
        evt.stopPropagation();
        new Post(this).addComment();
        return false;
    });
});

/*  Post class as an object-oriented wrapper around DOM elements */
function Post(el) {

    var $el = $(el),
        postEl = $el.hasClass('blog-post') ? $el : $el.parents('.blog-post'),
        addCommentEl = postEl.find('.add-comment'),
        newCommentEl = postEl.find('.new-comment'),
        commentEl = newCommentEl.find('[name=Body]'),
        commentsContainer = postEl.find('.comments-container'),
        postKey = commentsContainer.data('post-key'),
        commentsEl = postEl.find('.comments'),
        showCommentsButton = postEl.find('.show-comments'),
        noCommentsEl = postEl.find('.no-comments');

    /*********  Web API Methods ***********/


    // RESTful Web API URL:  /api/posts/{postKey}/comments
    var webApiUrl = ['/api/posts', postKey, 'comments'].join('/');

    function addComment() {

        var comment = { Body: commentEl.val() };

        $.ajax({
            url: webApiUrl,
            type: 'POST',
            data: JSON.stringify(comment),
            contentType: 'application/json'
        }).then(renderComments);

    }

    function showComments() {

        $.ajax({
            url: webApiUrl,
            type: 'GET',
            contentType: 'application/json'
        }).then(renderComments);

    }


    /****************************************/


    function showAddComment() {
        addCommentEl.addClass('hide');
        newCommentEl.removeClass('hide');
        commentEl.focus();
    }


    return {
        addComment: addComment,
        renderComment: renderComments,
        showAddComment: showAddComment,
        showComments: showComments,
    };


    /*********  Private methods ****************/
    function createCommentElements(comments) {
        comments = [].concat(comments);

        if (!comments.length) {
            return $('<div class="no-comments">No comments</div>');
        }

        return comments.reduce(function (commentEls, comment) {
            var el =
                $('<div class="comment">')
                    .append($('<p class="details">').append(comment.author || 'Anon').append(' at ' + new Date(comment.posted).toLocaleString()))
                    .append($('<p class="body">').append(comment.body));

            return commentEls.concat(el);
        }, []);
    }

    function renderComments(comments) {
        var commentEls = createCommentElements(comments);
        commentsEl.append(commentEls);
        commentsContainer.removeClass('hide');
        showCommentsButton.remove();
        noCommentsEl.remove();
        resetAddComment();
    }

    function resetAddComment() {
        addCommentEl.removeClass('hide');
        newCommentEl.addClass('hide');
        commentEl.val('');
    }
}