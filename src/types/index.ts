export interface NavItemTypes {
  label: string;
  url?: string;
}

export interface HeaderNavItemTypes extends NavItemTypes {
  subItems?: NavItemTypes[];
}

export interface ImageTypes {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface OfferCardTypes {
  key: string;
  label: string;
  image: ImageTypes;
  url: string;
}

export interface WhyChooseListDataTypes {
  title: string;
  image: ImageTypes;
  shortDescription: string;
}

export interface BlogCardActionTypes {
  url: string;
  label: string;
}
export interface BlogCardTypes {
  featureImage: ImageTypes;
  publishAt: string;
  title: string;
  shortDescription: string;
  action: BlogCardActionTypes;
}

export interface FaqTypes {
  question: string;
  answer: string;
}

export interface ActionTypes {
  url: string;
  label: string;
}
export interface CourseCardTypes {
  image: ImageTypes;
  subTitle: string;
  title: string;
  shortDescription: string;
  action: ActionTypes; //learn more
   enrollUrl: string; // enroll url
}

export interface CourseFeatureItemTypes {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export interface CourseFeaturesTypes  {
  title: string;
  key: string;
  features: CourseFeatureItemTypes[]
}

export interface CourseDescriptionTypes {
  title: string;
  content: string;
}

export interface CourseContentMeta {
  totalDuration: string;
  totalLectures: string;
}
export interface CourseContentLecturesItem {
  label: string;
  duration: string;
  type: string;
}
export interface CourseContentLectures {
  key: string;
  title: string;
  items: CourseContentLecturesItem[];
  meta?: CourseContentMeta;
}
export interface CourseContentDataTypes {
  title: string;
  key: string;
  lectures: CourseContentLectures[];
}

export interface CourseHighlighDataTypes {
  key: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  value: string;
}