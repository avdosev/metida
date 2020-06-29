import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import md from '../../../services/markdown';
import { IPost } from '../../Pages/IPost';
import CommentIcon from '../../Images/CommentIcon/CommentIcon';
import SkeletonSvgTransition from '../SkeletonSvgTransition/SkeletonSvgTransition';

export default function IndexShortPostPlaceholder() {
    return (
        <div className="post">
            <div className="title">
                <SkeletonSvgTransition width={200} height={20} />
            </div>
            <div className="disclaimer">
                {' '}
                <SkeletonSvgTransition width={700} height={200} lines={7} />
            </div>
            <div className="after_post">
                <SkeletonSvgTransition width={150} height={35} className="after_post__button" />
                <SkeletonSvgTransition width={25} height={25} className="after_post_icon" />
            </div>
        </div>
    );
}
