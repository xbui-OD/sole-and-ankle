import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VariantLabelMap = {
  'on-sale': 'Sale',
  'new-release': 'Just Released!'
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper as={variant === 'on-sale' ? OnSaleWrapper : variant === 'new-release' ? NewReleaseWrapper : Wrapper}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <VariantLabel>{VariantLabelMap[variant]}</VariantLabel>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{variant === 'on-sale' ? formatPrice(salePrice) : ''}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const OnSaleWrapper = styled(Wrapper)``;

const NewReleaseWrapper = styled(Wrapper)``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const VariantLabel = styled.div`
  padding: 8px 10px;
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
  color: ${COLORS.white};
  font-size: 14/16rem;
  font-weight: ${WEIGHTS.medium};

  ${OnSaleWrapper} & {
    background-color: ${COLORS.primary};
  }

  ${NewReleaseWrapper} & {
    background-color: ${COLORS.secondary};
  }

  &:empty {
    display: none;
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${OnSaleWrapper} & {
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
